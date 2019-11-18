import React, { Fragment, FC } from 'react'
import { Helmet } from 'vtex.render-runtime'

import Footer from './components/Footer'

import favicon from './images/favicon.png'
import SideBar from './components/SideBar'
import TopNav from './components/TopNav'
import { EnhancedSideBarContentProvider } from './components/SideBarContext'

const PageLayoutContainer: FC = ({ children }) => {
  return (
    <Fragment>
      <Helmet>
        <title>VTEX IO Docs</title>
        <meta name="theme-color" content="#F71963" />
        <meta name="description" content="Documentation on VTEX IO" />
        <link rel="icon" href={favicon} />
        <script>
          {`window['_fs_debug'] = false;
          window['_fs_host'] = 'fullstory.com';
          window['_fs_script'] = 'edge.fullstory.com/s/fs.js';
          window['_fs_org'] = 'Q42XW';
          window['_fs_namespace'] = 'FS';
          (function (m,n,e,t,l,o,g,y){
              if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
              g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
              o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_script;
              y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
              g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
              g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
              g.log = function(a,b) { g("log", [a,b]) };
              g.consent=function(a){g("consent",!arguments.length||a)};
              g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
              g.clearUserCookie=function(){};
          })(window,document,window['_fs_namespace'],'script','user');`}
        </script>
      </Helmet>
      <div className="flex flex-row-l flex-column vh-100-l">
        <EnhancedSideBarContentProvider>
          <div
            className="w-25-l vh-100-l overflow-y-scroll"
            style={{ maxWidth: '280px', minWidth: '200px' }}>
            <SideBar />
          </div>
        </EnhancedSideBarContentProvider>
        <div
          className="w-100 min-vh-100 overflow-y-scroll flex flex-column justify-between"
          style={{ scrollBehavior: 'smooth' }}>
          <TopNav />
          {children}
          <Footer />
        </div>
      </div>
    </Fragment>
  )
}

export default PageLayoutContainer
