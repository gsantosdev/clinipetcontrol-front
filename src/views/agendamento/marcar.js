import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'
import { withRouter } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';


class MarcarAgendamento extends React.Component {
  state = {
    events:[
      {
        id: 0,
        title: 'All Day Event very long title',
        allDay: true,
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3))
      }
    ]

  }

  render() {

  
    
    const localizer = momentLocalizer(moment);
    return (

      <div style={{height:'500pt'}} className="row mb-3">
        <Calendar
          localizer={localizer}
          startAcessor="start"
          endAcessoor="end"
          defaultDate={moment().toDate()}
          events={this.state.events}
          />
      </div>
    )
  }

}



export default withRouter(MarcarAgendamento);