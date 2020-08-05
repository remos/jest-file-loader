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

test('expected default behaviour', ()=>{
    const transformer = createTransformer();

    mockMode = 'posix';
    expect(transformer.process('', testPosixPath, {
        rootDir: testPosixRoot
    })).toBe('module.exports = "dir/test/file.png";');

    mockMode = 'win32';
    expect(transformer.process('', testWin32Path, {
        rootDir: testWin32Root
    })).toBe('module.exports = "dir/test/file.png";');
});

test('expected explicate commonJS behaviour', ()=>{
    const transformer = createTransformer({esModule: false});

    mockMode = 'posix';
    expect(transformer.process('', testPosixPath, {
        rootDir: testPosixRoot
    })).toBe('module.exports = "dir/test/file.png";');

    mockMode = 'win32';
    expect(transformer.process('', testWin32Path, {
        rootDir: testWin32Root
    })).toBe('module.exports = "dir/test/file.png";');
});

test('expected esModule behaviour', ()=>{
    const transformer = createTransformer({esModule: true});

    mockMode = 'posix';
    expect(transformer.process('', testPosixPath, {
        rootDir: testPosixRoot
    })).toBe('export default "dir/test/file.png";');

    mockMode = 'win32';
    expect(transformer.process('', testWin32Path, {
        rootDir: testWin32Root
    })).toBe('export default "dir/test/file.png";');
});