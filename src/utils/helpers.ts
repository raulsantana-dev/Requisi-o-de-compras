import os from 'os';

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getWindowsUser(): string {
  return os.userInfo().username;
}

export async function mesPasta(): Promise<string> {
  const now = new Date();
  const mes = now.getMonth() + 1;
  return mes.toString().padStart(2, '0');
}

export async function diaPasta(): Promise<string> {
  const now = new Date();
  const dia = now.getDate();
  return dia.toString().padStart(2, '0');
}
