import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectQueryParams, selectRouteParams } from '@shared/util-store';

import { articlesAdapter, articlesFeature, ArticlesState, ARTICLE_FEATURE_KEY } from './articles.reducer';

export const selectArticlesState = createFeatureSelector<ArticlesState>(ARTICLE_FEATURE_KEY);

export const { selectIds, selectStatus } = articlesFeature;

export const { selectAll: selectAllArticles, selectEntities: selectArticlesEntities } =
  articlesAdapter.getSelectors(selectArticlesState);

export const selectArticleForEdit = createSelector(
  selectQueryParams,
  selectArticlesEntities,
  ({ id }, entities) => entities[id] || null,
);

export const selectOpenedArticle = createSelector(
  selectRouteParams,
  selectArticlesEntities,
  ({ id }, entities) => entities[id] || null,
);
