export const journalPostsQuery = `*[_type == "journalPost"] | order(date desc) [0...6] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "coverImage": coverImage.asset->url,
  date,
  location
}`;

export const journalPostBySlugQuery = `*[_type == "journalPost" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "coverImage": coverImage.asset->url,
  date,
  location,
  body
}`;
