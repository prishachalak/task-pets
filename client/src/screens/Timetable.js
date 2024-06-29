import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}

const Timetable = ({ navigation }) => {
    const [items, setItems] = useState({});

    const loadItems = (day) => {
        setTimeout(() => {
          for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);    
            if (!items[strTime]) {
              items[strTime] = [];
              const numItems = Math.floor(Math.random() * 3 + 1);
              for (let j = 0; j < numItems; j++) {
                items[strTime].push({
                  //name: 'Item for ' + strTime + ' #' + j,
                  name: 'Lecture',
                  //height: Math.max(50, Math.floor(Math.random() * 150)),
                  time: '10:00 - 11:00'
                });
              }
            }
          }
          const newItems = {};
          Object.keys(items).forEach((key) => {
            newItems[key] = items[key];
          });
          setItems(newItems);
        }, 1000);
      };

      const renderItem = (item) => {
        return (
            <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
                <Card>
                    <Card.Content>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>{item.time}</Text>
                                <Text>{item.name}</Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };


    return (
        <View style={{flex: 1}}> 
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={'2017-05-16'}
                renderItem={renderItem}
                theme={{
                    agendaDayTextColor: 'black',
                    agendaDayNumColor: 'maroon',
                    agendaTodayColor: 'red',
                    agendaKnobColor: 'grey',
                    //calendarBackground: 'purple',
                    selectedDayBackgroundColor: 'gainsboro',
                    selectedDayTextColor: 'black',
                    todayTextColor: 'blue',
                    //dayTextColor: 'black',
                    textDisabledColor: 'grey',
                    dotColor: 'transparent',
                    selectedDotColor: 'transparent',
                    arrowColor: 'orange',
                    monthTextColor: 'darkslategray',
                    textSectionTitleColor: 'darkslategray',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: 'bold',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 14,
                }}
            />
        </View>
    );
};

export default Timetable;