import Link from "next/link";

export default function Header() {

  return (
    <header
      className="bg-white dark:bg-card-dark shadow-sm sticky top-0 z-50 "
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8  container--header">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link href={'https://bluehome.cl/'} className="text-2xl font-bold text-primary text-logo">
              <img alt="logo bluehome" src="https://bluehome.cl/img/cnt_logo-header.svg" />
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              className="text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-primary transition-colors"
              href="https://bluehome.cl/#about"
            >¿Por qué elegirnos?</a
            >
            <a
              className="text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-primary transition-colors"
              href="https://bluehome.cl/#edifice"
            >Nuestros edificios</a
            >
            <a
              className="text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-primary transition-colors"
              href="https://bluehome.cl/#benefits"
            >Nuestra comunidad</a
            >
            <button
              className="flex items-center text-muted-light dark:text-muted-dark border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-colors"
            >
              Residentes
              <span className="material-icons text-xl ml-1">expand_more</span>
            </button>
          </nav>
          <div className="md:hidden">
            <button className="text-muted-light dark:text-muted-dark">
              <span className="material-icons text-3xl">menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}