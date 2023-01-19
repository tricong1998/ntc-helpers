import { createFileReadStream, writeDocsMultiLines } from '../shared/fileHelper';
import { createInterface } from 'readline';
import minimist, { ParsedArgs } from 'minimist';

interface Argv extends ParsedArgs {
  fileInput: string;
  fileOutput: string;
  arr: string;
}

export class FilterRowIncludedInArray {
  readArgv(): Argv {
    const argv = minimist(process.argv.slice(2));
    return { ...argv, arr: argv.arr.split(',') } as Argv;
  }
  async run() {
    this.log('FilterRowIncludedInArray: run');
    const argv = this.readArgv();
    this.log('FilterRowIncludedInArray: argv', {
      argv,
    });
    const fileStream = createFileReadStream(argv.fileInput);

    const readLines = createInterface({
      input: fileStream.stream,
      crlfDelay: Infinity,
    });
    const validLines: string[] = [];
    for await (const line of readLines) {
      const values = line.split(',');
      if (
        values.some((value) => {
          return argv.arr.includes(value);
        })
      ) {
        validLines.push(line);
      }
    }
    await writeDocsMultiLines(argv.fileOutput, validLines);
  }

  log(message: string, ...optionalParams: any[]) {
    console.log(message, optionalParams);
  }
}
