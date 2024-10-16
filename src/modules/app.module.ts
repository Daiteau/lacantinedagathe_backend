import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { AuthModule } from './auth/auth.module';
import { JwtBlackListModule } from './jwt_black_list/jwt_black_list.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Utilisation de TypeOrmModule.forRootAsync pour injecter le ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importer ConfigModule ici pour utiliser ConfigService
      inject: [ConfigService], // Injecter ConfigService pour accéder aux variables d'environnement
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'), // Récupération de l'hôte depuis .env
        port: configService.get<number>('DB_PORT'), // Récupération du port depuis .env
        username: configService.get<string>('DB_USERNAME'), // Récupération du nom d'utilisateur depuis .env
        password: configService.get<string>('DB_PASSWORD'), // Récupération du mot de passe depuis .env
        database: configService.get<string>('DB_DATABASE'), // Récupération du nom de la base de données depuis .env
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Chemin des entités
        synchronize: true, // Synchronise automatiquement les entités (ne pas utiliser en production)
      }),
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
    AuthModule,
    JwtBlackListModule,
  ],
  controllers: [], // Les contrôleurs si tu en as
  providers: [],   // Les providers si tu en as
})
export class AppModule {}