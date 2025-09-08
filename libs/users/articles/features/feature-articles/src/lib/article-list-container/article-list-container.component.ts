import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetDirective } from '@ngrx/component';
import { select, Store } from '@ngrx/store';
import { map, Observable, withLatestFrom } from 'rxjs';

import { selectQueryParam } from '@shared/util-store';
import { articlesActions, articleSelectors, ArticlesFacade } from '@users/articles/data-access-article';
import { authSelectors } from '@users/core/data-access-auth';
import { Article } from '@users/shared/data-access-models';

import { ArticleListComponent } from '../article-list/article-list.component';

@Component({
  standalone: true,
  imports: [CommonModule, ArticleListComponent, LetDirective, MatProgressBarModule],
  templateUrl: './article-list-container.component.html',
  styleUrls: ['./article-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListContainerComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly articleFacade = inject(ArticlesFacade);
  public readonly articles$ = this.articleFacade.articles$;
  public readonly status$ = this.articleFacade.status$;
  public readonly loggedUserId$ = this.store.select(authSelectors.selectLoggedUserId);
  public articleId$ = this.store.pipe(select(selectQueryParam('id')));

  public viewedArticle$: Observable<Article | null> = this.store.select(articleSelectors.selectArticleForEdit).pipe(
    withLatestFrom(this.articleId$),
    map(([article, id]) => {
      if (!article && id && typeof id === 'string') {
        this.store.dispatch(articlesActions.getArticleForEdit({ id: Number(id) }));
      }
      return article;
    }),
  );

  ngOnInit(): void {
    this.store.dispatch(articlesActions.loadArticles());
  }
}
