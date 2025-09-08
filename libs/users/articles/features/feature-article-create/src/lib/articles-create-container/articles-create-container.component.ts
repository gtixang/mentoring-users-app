import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { articlesActions, articleSelectors, ArticlesFacade, CreateArticle } from '@users/articles/data-access-article';
import { Article } from '@users/shared/data-access-models';

import { ArticlesCreateUiComponent } from '../articles-create-ui/articles-create-ui.component';

@Component({
  standalone: true,
  imports: [LetDirective, ArticlesCreateUiComponent],
  templateUrl: './articles-create-container.component.html',
  styleUrls: ['./articles-create-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesCreateContainerComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly articleFacade = inject(ArticlesFacade);
  private readonly store = inject(Store);

  private readonly articleId = this.activatedRoute.snapshot.queryParamMap.get('id');

  private isFormChanged = false;

  readonly isEdit = Boolean(this.articleId);
  readonly editingArticle$ = this.store.select(articleSelectors.selectArticleForEdit);

  //canDeactivate: () => boolean | Observable<boolean>;

  constructor() {
    if (Number(this.articleId)) {
      this.getArticle(Number(this.articleId));
    }
  }

  onPublishArticle(article: CreateArticle) {
    this.articleFacade.publishArticle(article);
  }

  onFormChange(isFormChanged: boolean) {
    this.isFormChanged = isFormChanged;
  }

  // canDeactivate(): Observable<boolean> {
  //   if (!this.isFormChanged) {
  //     return of(true);
  //   } else {
  //     return this.confirmDialogService
  //       .open({
  //         title: 'Подтверждение выхода',
  //         content: 'Вы уверены, что хотите покинуть данную страницу?<br>Несохранённые изменения будут утеряны!',
  //         primaryButtonText: 'Покинуть страницу',
  //         secondaryButtonText: 'Остаться',
  //       })
  //       .afterClosed()
  //       .pipe(map(Boolean));
  //   }
  // }

  private getArticle(id: Article['id']) {
    this.store.dispatch(articlesActions.getArticleForEdit({ id }));
  }
}
