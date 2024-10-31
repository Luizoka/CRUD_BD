import { ApplicationConfig, CrudBdApplication } from './application';
import dotenv from 'dotenv'; // Certifique-se de usar a importação correta do dotenv

// Carregando as variáveis de ambiente
dotenv.config();

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new CrudBdApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST ?? '127.0.0.1',
      // O `gracePeriodForClose` fornece um fechamento suave para http/https
      gracePeriodForClose: 5000, // 5 segundos
      openApiSpec: {
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
