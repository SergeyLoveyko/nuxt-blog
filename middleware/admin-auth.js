export default function({store, redirect}) {
  if(!store.getters['auth/isAuthenticated']) {
    console.log( 'redirect' );
    redirect('/admin/login?message=login')
  }
}