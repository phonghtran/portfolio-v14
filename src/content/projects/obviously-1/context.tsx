import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function ContextSection() {
  return (
    <div className="space-y-6">
      <h2>Obviously #1</h2>
      <h3>Building a Design Foundation</h3>
      <p>
        Starting in 2020, I was Obviously’s first UX designer hire. The
        nine-year startup focused on influencer marketing campaigns and
        supporting its custom SASS platform to facilitate these campaigns. The
        company executes campaigns by finding influencers, managing the content
        creation process, and collecting analytics on the collective performance
        of those social media posts. Before I joined, they relied on the
        Engineering team and occasional freelancers to fulfill design needs.
      </p>

      <h2>The Need for Foundation Design</h2>
      <h3>No Consistency</h3>

      <p>
        Years of engineer-led design decisions led to hundreds of
        inconsistencies on the component, page, and architecture levels. Also,
        half-hearted do-overs of the CSS meant it wasn’t an easy fix.
      </p>

      <p>To tackle this, I initiated a series of phases and activities.</p>

      <ul className="traditionalBulletedList">
        <li className="ml-0">A complete UI audit of every page.</li>
        <li className="ml-0">
          Interviews with the Director of Engineering to get the history the UI
          and CSS front-end stack.
        </li>
        <li className="ml-0">
          Building a brand new Design System with new typography, colors,
          layouts, and components based the existing Bootstrap framework.
        </li>
        <li className="ml-0">
          Working with Product on where we could implement this safely.
        </li>
        <li className="ml-0">
          Overhauling an isolated part of the system to completely redo the CSS
          architecture under the new Design System
        </li>
        <li className="ml-0">
          Progressively enhancing sub-system by sub-system until the
          transformation was complete.
        </li>
      </ul>
    </div>
  );
}
