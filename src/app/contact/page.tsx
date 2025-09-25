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
    <div className="flex flex-col h-screen">
      <PageHeader title="Work - phonghtran" />
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Map Container - Full Height Half Width */}
        <div className="flex-1 lg:w-1/2 h-64 lg:h-full">
          <LocationLineMap className="w-full h-full" debugMode={false} />
        </div>
        {/* Contact Content */}
        <div className="flex-1 lg:w-1/2 overflow-y-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <h2 className="text-3xl font-bold mb-6">Contact</h2>
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
