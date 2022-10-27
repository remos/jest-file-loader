import {createTransformer} from './index';

const testPosixRoot = '/root/';
const testPosixPath = '/root/dir/test/file.png';
const testWin32Root = 'C:\\root\\';
const testWin32Path = 'C:\\root\\dir\\test\\file.png';

let mockMode = 'posix';

jest.mock('path', ()=>{
    const path = jest.requireActual('path');

    return {
        ...path,
        relative: (...args) => (
            path[mockMode].relative(...args)
        )
    };
});

describe('For jest versions < 27', ()=> {
    test('expected default behaviour', ()=>{
        const transformer = createTransformer();
    
        mockMode = 'posix';
        expect(transformer.process('', testPosixPath, {
            rootDir: testPosixRoot
        })).toStrictEqual({ code: 'module.exports = "dir/test/file.png";' });
    
        mockMode = 'win32';
        expect(transformer.process('', testWin32Path, {
            rootDir: testWin32Root
        })).toStrictEqual({ code: 'module.exports = "dir/test/file.png";' });
    });
    
    test('expected explicate commonJS behaviour', ()=>{
        const transformer = createTransformer({esModule: false});
    
        mockMode = 'posix';
        expect(transformer.process('', testPosixPath, {
            rootDir: testPosixRoot
        })).toStrictEqual({ code: 'module.exports = "dir/test/file.png";' });
    
        mockMode = 'win32';
        expect(transformer.process('', testWin32Path, {
            rootDir: testWin32Root
        })).toStrictEqual({ code: 'module.exports = "dir/test/file.png";' });
    });
    
    test('expected esModule behaviour', ()=>{
        const transformer = createTransformer({esModule: true});
    
        mockMode = 'posix';
        expect(transformer.process('', testPosixPath, {
            rootDir: testPosixRoot
        })).toStrictEqual({ code: 'export default "dir/test/file.png";' });
    
        mockMode = 'win32';
        expect(transformer.process('', testWin32Path, {
            rootDir: testWin32Root
        })).toStrictEqual({ code: 'export default "dir/test/file.png";' });
    });
});

describe('For jest versions >= 27', ()=> {
    test('expected default behaviour', ()=>{
        const transformer = createTransformer();
    
        mockMode = 'posix';
        expect(transformer.process('', testPosixPath, {
            config: {rootDir: testPosixRoot}
        })).toStrictEqual({ code: 'module.exports = "dir/test/file.png";' });
    
        mockMode = 'win32';
        expect(transformer.process('', testWin32Path, {
            config: {rootDir: testWin32Root}
        })).toStrictEqual({ code: 'module.exports = "dir/test/file.png";' });
    });
    
    test('expected explicate commonJS behaviour', ()=>{
        const transformer = createTransformer({esModule: false});
    
        mockMode = 'posix';
        expect(transformer.process('', testPosixPath, {
            config: {rootDir: testPosixRoot}
        })).toStrictEqual({ code: 'module.exports = "dir/test/file.png";' });
    
        mockMode = 'win32';
        expect(transformer.process('', testWin32Path, {
            config: {rootDir: testWin32Root}
        })).toStrictEqual({ code: 'module.exports = "dir/test/file.png";' });
    });
    
    test('expected esModule behaviour', ()=>{
        const transformer = createTransformer({esModule: true});
    
        mockMode = 'posix';
        expect(transformer.process('', testPosixPath, {
            config: {rootDir: testPosixRoot}
        })).toStrictEqual({ code: 'export default "dir/test/file.png";' });
    
        mockMode = 'win32';
        expect(transformer.process('', testWin32Path, {
            config: {rootDir: testWin32Root}
        })).toStrictEqual({ code: 'export default "dir/test/file.png";' });
    });
});