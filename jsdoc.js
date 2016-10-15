#!/usr/bin/env node

/**
 * Generates JSDoc and adds it to the readme.
 *
 * JSDoc will include certain elements even if they're marked @private,
 * so we remove elements marked with #jsdoc-ignore from final docs.
 */
const fs     = require(`mz/fs`),
    jsdoc2md = require(`jsdoc-to-markdown`);

let file;

const api    = `## API`,
    readme   = `README.md`,
    start    = 0,
    end      = 1,
    name     = /<a\s+name="([\w+]+)"><\/a>/g,
    gotDocs  = jsdoc2md.render({files: `src/**/*.js`, 'heading-depth': 3}),
    gotStats = fs.stat(readme),
    removeIgnored = (docs, i, removed) => {
        let section = docs[i],
            lastMatch;

        for (
            let j = start, match = name.exec(section);
            match;
            match = name.exec(section), j++
        ) {
            if (i > start && j === start) {
                docs[i] = section = section.
                    slice(section.indexOf(match[0]));
            }

            lastMatch = match;
        }

        if (i < docs.length - end) {
            docs[i] = section.slice(start, section.indexOf(lastMatch[0]));
            removed.push(lastMatch[1]);
        }
    },
    removeAllIgnored = docs => {
        docs = docs.split(`#jsdoc-ignore`);

        const removed = [];

        for (let i = 0; i < docs.length; i++) {
            removeIgnored(docs, i, removed);
        }

        return [docs, removed];
    },
    removeReferences = ([docs, removed]) => {
        docs = docs.join(``);

        for (const id of removed) {
            docs = docs.replace(new RegExp(`.*#${id}.*\\n`, `g`), ``);
        }

        return docs;
    };

fs.open(readme, `r+`).
    then(fd => file = fd).
    then(() => gotStats).
    then(stats =>
        fs.read(file, Buffer.alloc(stats.size), start, stats.size, null)
    ).
    then(([, content]) => content.indexOf(api) + api.length).
    then(apiStart      => fs.ftruncate(file, apiStart)).
    then(()            => fs.close(file)).
    then(()            => fs.open(readme, `a`)).
    then(fd            => file = fd).
    then(()            => gotDocs).
    then(docs          => removeReferences(removeAllIgnored(docs))).
    then(docs          => fs.appendFile(file, `\n${docs}`)).
    then(()            => fs.close(file));