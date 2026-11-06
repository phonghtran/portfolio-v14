'use client';

import { useEffect, useState } from 'react';
import { caseStudyOrder, rankableIds } from '@/lib/contents';
import { projects, type Project } from '@/lib/projects-data';
import { TAILORING_COOKIE, parseTailoring } from '@/lib/tailoring';

function readCookie(name: string) {
  const match = document.cookie.split('; ').find(c => c.startsWith(`${name}=`));
  return match?.slice(name.length + 1);
}

/**
 * Case studies in the visitor's order (tailored or default), read from the
 * tailoring cookie in the browser. Starts in the default order; the menus that
 * use it are closed on load, so the switch is never visible.
 */
export function useCaseStudyOrder(): Project[] {
  const [order, setOrder] = useState(() => caseStudyOrder());

  useEffect(() => {
    const tailoring = parseTailoring(readCookie(TAILORING_COOKIE), rankableIds);
    setOrder(caseStudyOrder(tailoring?.picks));
  }, []);

  return order.map(id => projects.find(p => p.id === id)!);
}
