import type News from '~/types/news'
import getItem from './item'

async function getLatestNewsIds(limit?: number) {
	const res = await fetch(
		'https://hacker-news.firebaseio.com/v0/newstories.json'
	)
	const news: number[] = await res.json()

	return news.slice(0, limit ?? -1)
}

export default async function getLatestNews(limit?: number): Promise<News[]> {
	const newsIds = await getLatestNewsIds(limit)
	const newsPromises = newsIds.map(getItem<News>)

	return await Promise.all(newsPromises)
}
