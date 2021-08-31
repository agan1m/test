const fs = require('fs');
const path = require('path');
const whiteFile = require('../whiteFile');

describe('whiteFile', () => {

    afterAll(() => {
        const dir = `${process.cwd()}/__tests__/dump`
        fs.readdir(dir, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(path.join(dir, file), err => {
                    if (err) throw err;
                });
            }
        })
    })

    it('should return error without path', () => {
        whiteFile('', 'test').catch(err => expect(err).toEqual(new Error('path must be sting')))
    })

    it('should return error', () => {
        whiteFile(`${process.cwd()}/__tests__/testing`, 'test').catch(err => expect(err).toBeTruthy())
    })

    it('should create file with date', async () => {
        const path = `${process.cwd()}/__tests__/dump`;
        await whiteFile(path, 'test');
        const dir = fs.readdirSync(path);
        const testing = dir.some((file) => file.match(/.\d/))
        expect(testing).toBeTruthy();
    })

    it('should create file with name', async () => {
        const path = `${process.cwd()}/__tests__/dump/test.txt`;
        await whiteFile(path, 'test');
        const isExist = fs.existsSync(path);
        expect(isExist).toBeTruthy();
    })
})
