import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // Pour gérer les variables d'environnement
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ContentModule } from './contents/contents.module';
import { RatingsModule } from './ratings/ratings.module';
import { CommentsModule } from './comments/comments.module';
import { CommentLikesModule } from './comment_likes/comment_likes.module';
import { ContentLikesModule } from './content_likes/content_likes.module';
import { RecipesModule } from './recipes/recipes.module';
import { ContentPicturesModule } from './content_pictures/content_pictures.module';
import { PicturesModule } from './pictures/pictures.module';
import { ContentTagsModule } from './content_tags/content_tags.module';
import { TagsModule } from './tags/tags.module';

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
    CommentsModule,
    CommentLikesModule,
    ContentLikesModule,
    RecipesModule,
    ContentPicturesModule,
    PicturesModule,
    ContentTagsModule,
    TagsModule,
    // ... autres modules
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}