import { BASE_PATH } from '@/constants';
import { cn } from '@/utils';
import Image from 'next/image';
import type { JSX } from 'react';
import { FiMail, FiMessageSquare, FiPhone } from 'react-icons/fi';

export default function SupportPage(): JSX.Element {
  const contacts = [
    {
      icon: FiPhone,
      label: 'Call Us',
      value: '+55 11 99999-9999',
      href: 'tel:+5511999999999',
    },
    {
      icon: FiMail,
      label: 'Email Us',
      value: 'support@banksafeone.com',
      href: 'mailto:support@banksafeone.com',
    },
    {
      icon: FiMessageSquare,
      label: 'Start Live Chat',
      value: 'Chat with our support team',
      href: '#',
    },
  ];

  return (
    <>
      <h1 className="text-base-800 mb-12 text-2xl font-semibold tracking-tight sm:text-3xl">
        Contact Support
      </h1>

      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-base-700 mb-2 text-lg font-medium">
            Need assistance? We&apos;re here to help.
          </h2>

          <h3 className="text-base-700 mb-8 text-base">
            Reach out to our support team at any time.
          </h3>

          <div className="mb-8 block sm:mb-0 sm:hidden">
            <Image
              src={`${BASE_PATH}/icon-support.png`}
              alt="Support"
              width={500}
              height={500}
            />
          </div>

          <div className="flex flex-col gap-4">
            {contacts.map(contact => (
              <a
                key={contact.label}
                href={contact.href}
                className={cn(
                  'group flex items-center gap-4',
                  'border-base-300 bg-base-200 rounded-lg border px-4 py-3',
                  'hover:shadow-md',
                  'transition-all duration-300'
                )}
              >
                <div
                  className={cn(
                    'flex size-10 items-center justify-center',
                    'bg-base-300 rounded-lg',
                    'bg-base-300'
                  )}
                >
                  <contact.icon className="size-6" />
                </div>

                <div className="flex flex-col">
                  <p className="-mb-0.5 font-bold">{contact.label}</p>
                  <span className="text-sm">{contact.value}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="hidden sm:block">
          <Image
            src={`${BASE_PATH}/icon-support.png`}
            alt="Support"
            width={500}
            height={500}
          />
        </div>
      </div>
    </>
  );
}
