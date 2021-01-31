#!/usr/bin/env node
import { resolve } from 'path';
import { register } from 'ts-node';
import { Kernel, ManifestLoader } from '@adonisjs/ace';
import webApp from '../utils/web-app';

register({ transpileOnly: true });

const kernel = new Kernel(webApp);

const printHelp = (value: any, command?: any) => {
  if (!value) {
    return;
  }
  kernel.printHelp(command);
  process.exit(0);
};

const main = async (argv: string[]) => {
  try {
    const manifestLoader = new ManifestLoader([
      {
        manifestAbsPath: resolve(__dirname, '..', 'resources', 'ace-manifest.json'),
        basePath: resolve(__dirname),
      },
    ]);
    kernel.flag('help', async (value, _, command) => printHelp(value, command), { alias: 'h' });
    kernel.useManifest(manifestLoader);
    await kernel.preloadManifest();
    if (!argv.length) {
      printHelp(true);
      return;
    }
    await kernel.handle(argv);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main(process.argv.slice(2)).catch(console.error);
