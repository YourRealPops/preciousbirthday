export interface Photo {
  id: string
  /**
   * Leave empty to show the placeholder frame, or point this at a real file.
   * Drop your images / videos in /public/photos/ and reference them like:
   * src: '/photos/first-date.jpg'
   */
  src: string
  /** 'photo' (default) or 'video' — controls whether the gallery renders an <img> or <video> */
  type?: 'photo' | 'video'
  alt: string
  caption: string
  date?: string
  /** "lg" gives a photo a larger, featured frame in the staggered grid */
  size?: 'lg' | 'md' | 'sm'
}

export const photos: Photo[] = [
  {
    id: 'p1',
    src: '/photos/first-date.jpg',
    alt: 'The two of us on our first date',
    caption: 'The one that started it all',
    date: '',
    size: 'lg',
  },
  {
    id: 'p2',
    src: '/photos/trip.jpeg',
    alt: 'A photo from our trip together',
    caption: 'That trip we still talk about',
    date: '',
    size: 'sm',
  },
  {
    id: 'p3',
    src: '/photos/Tuesday.MP4',
    type: 'video',
    alt: 'A candid ordinary-day moment',
    caption: 'An ordinary Tuesday, somehow not ordinary',
    date: '',
    size: 'md',
  },
  {
    id: 'p4',
    src: '/photos/laugh.MP4',
    type: 'video',
    alt: 'Her laughing',
    caption: 'That laugh. Every time.',
    date: '',
    size: 'sm',
  },
  {
    id: 'p5',
    src: '/photos/Golden-girl.jpeg',
    alt: 'A celebration together',
    caption: 'Already counting down to the next one',
    date: '',
    size: 'md',
  },
  {
    id: 'p6',
    src: '/photos/lovethis.jpg',
    alt: 'One more favorite memory',
    caption: 'Just because I love this one',
    date: '',
    size: 'sm',
  },
  {
    id: 'p7',
    src: '/photos/Quietmorning.jpeg',
    alt: 'A quiet morning together',
    caption: 'Quiet mornings hit different with you',
    date: '',
    size: 'md',
  },
  {
    id: 'p8',
    src: '/photos/DateNight.MP4',
    type: 'video',
    alt: 'A night out together',
    caption: 'Date night energy',
    date: '',
    size: 'sm',
  },
  {
    id: 'p9',
    src: '/photos/cleanup.jpeg',
    alt: 'The two of us dressed up',
    caption: 'You clean up nice, I must say',
    date: '',
    size: 'lg',
  },
  {
    id: 'p10',
    src: '/photos/count-down.jpeg',
    alt: 'A sunset or golden hour photo',
    caption: 'Golden hour with my golden girl',
    date: '',
    size: 'sm',
  },
  {
    id: 'p11',
    src: '/photos/OurThing.MP4',
    type: 'video',
    alt: 'A shared hobby or interest',
    caption: 'Our thing. Nobody else gets it.',
    date: '',
    size: 'md',
  },
  {
    id: 'p12',
    src: '/photos/Rentfree.jpg',
    alt: 'A silly goofy photo together',
    caption: 'This one lives in my phone rent-free',
    date: '',
    size: 'sm',
  },
]
