import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center">
        {/* Logo Section */}
        <div className="mb-4 lg:mb-0">
          <a href="/" className="text-2xl font-bold hover:text-gray-400">
        Nakhon Phanom Province
          </a>
        </div>
        
        {/* Links Section */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-center lg:text-left">
          <a href="/about" className="hover:text-gray-400">ติดต่อเรา</a>
        </div>

        {/* Social Media Section */}
        <div className="flex space-x-4 mt-4 lg:mt-0">
          <a href="https://facebook.com" className="hover:text-gray-400" aria-label="Facebook">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.351C0 23.4.6 24 1.325 24H12.82v-9.339H9.692v-3.64h3.128V8.41c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.464.098 2.794.143v3.24l-1.917.001c-1.504 0-1.796.715-1.796 1.764v2.311h3.591l-.468 3.64h-3.123V24h6.116C23.4 24 24 23.4 24 22.676V1.325C24 .6 23.4 0 22.675 0z" />
            </svg>
          </a>
          <a href="https://twitter.com" className="hover:text-gray-400" aria-label="Twitter">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775a4.924 4.924 0 0 0 2.163-2.724c-.951.555-2.005.959-3.127 1.184a4.924 4.924 0 0 0-8.384 4.494A13.98 13.98 0 0 1 1.671 3.149a4.924 4.924 0 0 0 1.523 6.573 4.907 4.907 0 0 1-2.229-.616v.061a4.924 4.924 0 0 0 3.946 4.827 4.925 4.925 0 0 1-2.224.085 4.926 4.926 0 0 0 4.6 3.417 9.864 9.864 0 0 1-7.29 2.034 13.901 13.901 0 0 0 7.548 2.213c9.058 0 14.012-7.504 14.012-14.012 0-.213-.005-.425-.014-.636a9.936 9.936 0 0 0 2.457-2.546z" />
            </svg>
          </a>
          <a href="https://instagram.com" className="hover:text-gray-400" aria-label="Instagram">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.327 3.608 1.302.975.975 1.24 2.243 1.302 3.608.058 1.265.07 1.645.07 4.849 0 3.204-.012 3.584-.07 4.849-.062 1.366-.327 2.633-1.302 3.608-.975.975-2.243 1.24-3.608 1.302-1.265.058-1.645.07-4.849.07-3.204 0-3.584-.012-4.849-.07-1.366-.062-2.633-.327-3.608-1.302-.975-.975-1.24-2.243-1.302-3.608-.058-1.265-.07-1.645-.07-4.849 0-3.204.012-3.584.07-4.849.062-1.366.327-2.633 1.302-3.608.975-.975 2.243-1.24 3.608-1.302 1.265-.058 1.645-.07 4.849-.07zm0-2.163c-3.29 0-3.707.014-4.997.072-1.42.062-2.746.322-3.769 1.346-1.023 1.023-1.283 2.349-1.345 3.769-.058 1.29-.072 1.707-.072 4.997s.014 3.707.072 4.997c.062 1.42.322 2.746 1.346 3.769 1.023 1.023 2.349 1.283 3.769 1.345 1.29.058 1.707.072 4.997.072s3.707-.014 4.997-.072c1.42-.062 2.746-.322 3.769-1.346 1.023-1.023 1.283-2.349 1.345-3.769.058-1.29.072-1.707.072-4.997s-.014-3.707-.072-4.997c-.062-1.42-.322-2.746-1.346-3.769-1.023-1.023-2.349-1.283-3.769-1.345-1.29-.058-1.707-.072-4.997-.072zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
            </svg>
          </a>
          <a href="https://linkedin.com" className="hover:text-gray-400" aria-label="LinkedIn">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.004 3H4.994A1.993 1.993 0 0 0 3 4.993v14.014A1.993 1.993 0 0 0 4.994 21h14.011A1.993 1.993 0 0 0 21 19.007V4.993A1.993 1.993 0 0 0 19.004 3zM8.333 18.651H5.643V9.685h2.689v8.966zM6.989 8.417a1.561 1.561 0 1 1 0-3.122 1.561 1.561 0 0 1 0 3.122zm12.011 10.234h-2.688v-4.316c0-1.03-.021-2.353-1.434-2.353-1.435 0-1.654 1.123-1.654 2.282v4.387H9.537V9.685h2.582v1.23h.036c.359-.677 1.234-1.387 2.541-1.387 2.717 0 3.217 1.789 3.217 4.116v5.007z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} MyCompany. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
