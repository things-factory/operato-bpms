export default function route(page) {
  switch (page) {
    case '':
      /* process-list 페이지를 default page로 한다. */
      return '/process-list'

    case 'process-list':
      import('./pages/process-list-page')
      return page
  }
}
