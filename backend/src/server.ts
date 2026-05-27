import app from './app';
import { env } from './config/env';
import { prisma } from './config/database';
import { AuthService } from './services/auth.service';

const server = app.listen(env.PORT, async () => {
  console.log(`🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  
  // Seed the default Super Admin if none exists
  try {
    await AuthService.seedSuperAdmin();
  } catch (err) {
    console.error('❌ Failed to seed default Super Admin:', err);
  }
});

// Graceful shutdown helper
const gracefulShutdown = async (signal: string) => {
  console.log(`\n📶 Received ${signal}. Shutting down gracefully...`);
  
  server.close(async () => {
    console.log('🛑 HTTP server closed.');
    
    // Disconnect from database
    try {
      await prisma.$disconnect();
      console.log('🔌 Database connection closed.');
      process.exit(0);
    } catch (err) {
      console.error('❌ Error during database disconnection:', err);
      process.exit(1);
    }
  });

  // Force close after timeout (10 seconds)
  setTimeout(() => {
    console.error('⚠️ Force shutting down due to shutdown timeout!');
    process.exit(1);
  }, 10000);
};

// Listen for termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Catch unhandled async rejections and synchronous exceptions
process.on('unhandledRejection', (err: Error) => {
  console.error('💥 UNHANDLED REJECTION! Shutting down...');
  console.error(err);
  process.exit(1);
});

process.on('uncaughtException', (err: Error) => {
  console.error('💥 UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err);
  process.exit(1);
});
