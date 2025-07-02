import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';

export function readExcel(filePath: string) {
  return XLSX.readFile(filePath);
}

export async function getFilesInFolder(folder: string, ext: string): Promise<string[]> {
  return fs.readdirSync(folder)
    .filter(file => file.endsWith(ext))
    .map(file => path.join(folder, file));
}

export async function renameFile(oldPath: string, newPath: string): Promise<void> {
  return fs.renameSync(oldPath, newPath);
}

export async function saveBlankFile(path: string) {
  return fs.writeFileSync(path, '');
}

export async function ReadTxt(path: string): Promise<string[]> {
  const data = fs.readFileSync(path, 'utf8');
  return data.split('\n');
}