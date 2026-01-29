import type { JSX } from 'react';

export const Footer = (): JSX.Element => {
  return (
    <footer className="border-base-200 text-base-400 mt-6 flex items-center justify-center border-t pt-4 pb-8">
      <p className="text-center text-xs">
        Copyright © 2026 HighNetRock LLC. BankSafe One™ is a trademark and
        proprietary platform of HighNetRock LLC. All rights reserved.
      </p>
    </footer>
  );
};
