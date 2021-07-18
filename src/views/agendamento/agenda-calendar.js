import React from 'react';
import { Inject, Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'
import { withRouter } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';


class AgendaCalendar extends React.Component {
  state = {
    events: [
      {
        id: 0,
        title: 'Title',
        start: new Date(new Date().setHours(new Date().getHours() - 5)),
        end: new Date(new Date().setHours(new Date().getHours() - 2))
      }
    ]
  }

  render() {

    
    const localizer = momentLocalizer(moment);
    return (

      <div style={{ height: '500pt' }} className="row mb-3">
        <Calendar
          localizer={localizer}
          defaultView="month"
          startAcessor="start"
          endAcessoor="end"
          defaultDate={moment().toDate()}
          events={this.state.events}
        >
        
        </Calendar>
      </div>
    )
  }

}

export default withRouter(AgendaCalendar)