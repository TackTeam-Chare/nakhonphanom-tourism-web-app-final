import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-white animate-pulse">404</h1>
        <p className="mt-4 text-4xl font-bold text-white animate-bounce">Page Not Found</p>
        <p className="mt-4 text-lg text-gray-100">
        Sorry, we can&apos;t find that page. 
        </p>
        <Link href="/" className="mt-8 inline-block px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
        Go back home
        </Link>
      </div>
    </section>
  );
}
