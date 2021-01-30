#!/usr/bin/env node
import { resolve } from 'path';
import { register } from 'ts-node';
import { Kernel, ManifestLoader } from '@adonisjs/ace';
import webApp from '../utils/web-app';

register({ transpileOnly: true });

const main = async (args: string[]) => {
  console.log(webApp);
  const kernel = new Kernel(webApp);
  const manifestLoader = new ManifestLoader([
    {
      manifestAbsPath: resolve(__dirname, '..', 'resources', 'ace-manifest.json'),
      basePath: resolve(__dirname),
    },
  ]);
  kernel.flag(
    'help',
    async (value, _, command) => {
      if (!value) {
        return;
      }
      kernel.printHelp(command);
      process.exit(0);
    },
    { alias: 'h' }
  );
  kernel.useManifest(manifestLoader);
  await kernel.handle(args);
};

main(process.argv.slice(2)).catch(console.error);
