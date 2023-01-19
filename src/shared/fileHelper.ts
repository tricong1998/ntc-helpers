import * as fs from 'fs'

export const createFileReadStream = (
    fileName: string,
  ): {stream: fs.ReadStream; cleanup: () => void} => {
    const stream = fs.createReadStream(fileName);
  
    return {
      stream,
      cleanup: (): void => {
        fs.unlinkSync(fileName);
      },
    };
  };
  

  export const writeDocs = async (fileName: string, ...argv: string[]) => {
    return new Promise((resolve, reject) => {
      fs.appendFile(fileName, `${argv.join(',')}\r\n`, (err) => {
        if (err) throw reject(err);
        console.log(`Saved fileName: ${fileName}`, {argv});
        resolve(true);
      });
    });
  }
  
  export const writeDocsMultiLines = async (fileName: string, lines: string[]) => {
    return new Promise((resolve, reject) => {
      fs.appendFile(
        fileName,
        `${lines.length === 1 ? lines[0] : lines.join(',\r\n')},\r\n`,
        (err) => {
          if (err) throw reject(err);
          console.log(`Saved fileName: ${fileName}`, { lines });
          resolve(true);
        },
      );
    });
  }