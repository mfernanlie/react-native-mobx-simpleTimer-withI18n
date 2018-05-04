import React, {Component} from 'react';
import {useStrict} from 'mobx';
import {observer} from 'mobx-react/native';
import {enableLogging} from 'mobx-logger';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Timer from './Timer';
import TimerStore from '../stores/TimerStore';
import I18n from '../internationalization/i18n';
import TimerModel from '../stores/TimerModel';
import StringStore from '../stores/StringStore';

useStrict(true);

enableLogging({
    predicate: () => __DEV__ && Boolean(window.navigator.userAgent),
    action: true,
    reaction: false,
    compute: false
});

const language = [
    {lang: "English", code: "en"},
    {lang: "Indonesian", code: "id"},
    {lang: "Chinese", code: "zh"}
]


@observer
export default class App extends Component {

    constructor(){
        super()
        this.state = {
            languages: [],
            value: false,
            langValue: "en",
            select: "Select Language",
        }
        this.onLanguage=this.onLanguage.bind(this);
    }

    static defaultProps = {
        store: new TimerStore(),
        stringStore: new StringStore()
    };

    onSelectLanguage() {
        return(
          language.map((data, i)=>{
            return (
               <View key={i} style={styles.dropDownView}>
                 <TouchableOpacity onPress={()=>this.onSelectedLang(data)}>
                   <Text style={styles.dropDownText}>{data.lang}</Text>
                 </TouchableOpacity>
               </View>
            )
          })
        )
      }
    
      onSelectedLang(text) {
        this.setState({
          value: false,
          select: text.lang,
        }),
        I18n.locale = text.code;
      }

      onLanguage() {
        this.setState({
          value: true,
        })
      }

    render() {
        const {store} = this.props;
        const {stringStore} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headline}>
                        {stringStore.titleMessage()}
                    </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={this.onLanguage}>
                        <View style={styles.buttonView}>
                            <Text style={styles.buttontext}>{this.state.select}</Text>
                        </View>
                    </TouchableOpacity>
                    <View>
                        {(this.state.value) ? this.onSelectLanguage() : null}
                    </View>
                </View>
                <View style={styles.content}>
                    {/* {store.timers.map((timer, i) => (
                        <Timer timerModel={timer} key={i}/>
                    ))} */}
                    <Timer timerModel={(new TimerModel())}/>
                </View>
                <View style={styles.footer}>
                    <Text style={{fontSize: 20}}>
                        {stringStore.footerMessage()}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFF'
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,
        paddingTop: 20
    },
    headline: {
        fontSize: 30
    },
    content: {
        flex: 5,
        paddingTop: 50
    },
    dropDownView: {
        backgroundColor: "#8b9dc3",
        padding: 10,
    },
    dropDownText: {
        paddingTop: 2,
        color: "#fff",
    },
    buttonView: {
        backgroundColor: "#3b5998",
        padding: 10,
    },
    buttontext: {
        color: "#fff",
    },
    footer: {
        flex: 2,
        alignSelf: "center"
    }
});
