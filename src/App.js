import React, {Timeout} from 'react';
import { createResource } from 'simple-cache-provider';
import { withCache } from './components/withCache'; 
import './App.css';

const sleep = ms => new Promise(r => setTimeout(() => r(), ms));

const readShows = createResource(async function fetchShows() {
  await sleep(3000);
  const res = await fetch(`http://api.tvmaze.com/search/shows?q=girls`);
  return await res.json();
});

const Movies = withCache( (props) => {

  const result = readShows(props.cache, props.title);

  return (
    <React.Fragment>
      {result &&
          result.length &&
            result.map(item => (
              <div className="column is-4">
                <div className="movie">
                  <div className="movie__left">
                    <img src={item.show.image.original} />
                  </div>
                  <div className="movie__right">
                    <div className="movie__right__title">{item.show.name}</div>
                    <div className="movie__right__subtitle">Score: {item.show.rating.average}</div>
                    <div className="movie__right__subtitle">Status: {item.show.status}</div>
                    <div className="movie__right__subtitle">Network: {item.show.network ? item.show.network.name : 'N/A'}</div>
                    <a href={item.show.url} target="_blank" className="movie__right__subtitle">Link</a>
                  </div>
                </div>
              </div>
            ))
        }
    </React.Fragment>
  )
});

const Placeholder = ({ delayMs, fallback, children }) => {
  return (
    <Timeout ms={delayMs}>
      {didExpire => {
        return didExpire ? fallback : children;
      }}
    </Timeout>
  );
}

export default class App extends React.Component {

  render() {

    return (
      <React.Fragment>        
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">React Suspense Demo</h1>
          </header>

          <div className="container">
          <div className="columns is-multiline">
              <Placeholder delayMs={1000} fallback={<div>Loading</div>}>
                <Movies />
              </Placeholder>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

