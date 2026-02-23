export interface JournalPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage: string;
  date: string;
  location: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  date: string;
  venue: string;
  message: string;
}
