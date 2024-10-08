import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // Pour gérer les variables d'environnement
import { User } from './users/user.entity'; // Exemple d'entité
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ContentModule } from './contents/contents.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Les variables d'environnement sont accessibles partout
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Hôte de la base de données
      port: 3306,        // Port MySQL par défaut
      username: 'root',  // Utilisateur MySQL
      password: '', // Mot de passe MySQL
      database: 'lacantinedagathe_db',      // Nom de la base de données
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Chemin des entités
      synchronize: true, // Synchronise automatiquement les entités (ne pas utiliser en prod)
    }),
    UsersModule,
    RolesModule,
    FavoritesModule,
    ContentModule,
    RatingsModule,
    // ... autres modules
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}