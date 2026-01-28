import {
  CheckUserInstitutions,
  Footer,
  NavBottom,
  Sidebar,
} from '@/containers';
import '@/theme/globals.css';
import { type JSX, type PropsWithChildren } from 'react';

export default function ProtectedLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <>
      <CheckUserInstitutions />

      <div className="bg-gray-light flex min-h-screen pb-16 xl:pb-0">
        {/* =================================== */}
        {/* Sidebar                             */}
        {/* =================================== */}
        <div className="hidden xl:block">
          <Sidebar />
        </div>

        {/* =================================== */}
        {/* Conteúdo do layout                  */}
        {/* =================================== */}
        <div className="flex min-h-screen flex-1 flex-col px-6 pt-6">
          <div className="flex-1">{children}</div>

          <Footer />
        </div>

        <div className="block xl:hidden">
          <NavBottom />
        </div>
      </div>
    </>
  );
}
