import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { articlesActions } from './articles.actions';
import * as articleSelectors from './articles.selectors';
import { CreateArticle } from '../interfaces/create-article.interface';

@Injectable({ providedIn: 'root' })
export class ArticlesFacade {
  private readonly store = inject(Store);

  public readonly articles$ = this.store.select(articleSelectors.selectAllArticles);
  public readonly status$ = this.store.select(articleSelectors.selectStatus);

  editArticle(articleData: CreateArticle, id: number) {
    this.store.dispatch(articlesActions.editArticle({ articleData, id }));
  }

  publishArticle(article: CreateArticle) {
    this.store.dispatch(articlesActions.publishArticle({ article }));
  }

  loadArticles() {
    this.store.dispatch(articlesActions.loadArticles());
  }
}
