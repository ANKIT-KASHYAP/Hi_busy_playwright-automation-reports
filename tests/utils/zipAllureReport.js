import fs from 'fs';
import archiver from 'archiver';

export function zipReport() {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream('test-report.zip');
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => resolve());
    archive.on('error', err => reject(err));

    archive.pipe(output);
    archive.directory('allure-report/', false);
    archive.finalize();
  });
}
