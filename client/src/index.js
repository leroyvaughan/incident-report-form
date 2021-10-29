import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { GlobalProvider } from './context/form-post-data';

import './assets/normalize.css';
import './assets/skeleton.css';
import './assets/index.css';

import App from './App';
import EditReport from './components/reports/EditReport';
import ReportView from './components/reports/ReportView';
import ReportsList from './components/reports/ReportsList';
import FeedbackSubmit from './components/feedback/FeedbackSubmit';
import FourOhFour from './components/404';


ReactDOM.render(
  <React.StrictMode>

    <GlobalProvider>

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/reports/single/:id" render={(props) =>
            <ReportView {...props} />} />

          <Route exact path="/reports/view/:id" render={(props) =>
            <ReportView {...props} />} />

          <Route exact path="/reports/edit/:id" render={(props) =>
            <EditReport {...props} />} />

          <Route exact path="/reports/all" render={(props) =>
            <ReportsList {...props} />} />

          <Route exact path="/feedback/submit" render={(props) =>
            <FeedbackSubmit {...props} />} />

          <Route path="*" component={FourOhFour} />
        </Switch>
      </BrowserRouter>

    </GlobalProvider>

  </React.StrictMode>,
  document.getElementById('root')
);
