import { PageHeader } from '@/components/layout/page-header';
import { LocationLineMap } from '@/components/map/location-line-map';
import {
  File,
  PhoneOutgoing,
  Instagram,
  Linkedin,
  Github,
  SendHorizontal,
} from 'lucide-react';

export default function Contact() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Work - phonghtran" />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Contact </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <LocationLineMap />
            </div>

            {/* Contact Content */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="max-w-none">
                <div>
                  <ul>
                    <li className="flex items-center mb-4">
                      <File className="h-8 w-8 text-primary mr-2" />
                      <a
                        href="https://drive.google.com/file/d/1mV6YmcOtbtGZBgOERzwr5SmDBpGyNkNU/view?usp=sharing"
                        target="_blank"
                      >
                        Resume/CV
                      </a>
                    </li>
                    <li className="flex items-center mb-4">
                      <SendHorizontal className="h-8 w-8 text-primary mr-2" />
                      <a href="mailto:phong@phonghtran.com">
                        phong@phonghtran.com
                      </a>
                    </li>
                    <li className="flex items-center mb-4">
                      <PhoneOutgoing className="h-8 w-8 text-primary mr-2" />{' '}
                      612-481-4203
                    </li>
                    <li className="flex items-center mb-4">
                      <Linkedin className="h-8 w-8 text-primary mr-2" />
                      <a
                        href="https://www.linkedin.com/in/phonghtran/"
                        target="_blank"
                      >
                        LinkedIn
                      </a>
                    </li>
                    <li className="flex items-center mb-4">
                      <Instagram className="h-8 w-8 text-primary mr-2" />
                      <a
                        href="https://www.instagram.com/phonghtran/"
                        target="_blank"
                      >
                        Instagram
                      </a>
                    </li>
                    <li className="flex items-center mb-4">
                      <Github className="h-8 w-8 text-primary mr-2" />
                      <a href="https://github.com/phonghtran/" target="_blank">
                        Github
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
