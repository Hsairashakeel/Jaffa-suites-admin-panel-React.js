import React from 'react'
import $ from 'jquery'
class Widget extends React.Component {

    js() {
        $(function () {


            window.$('#chat-conversation').slimscroll({
                height: '264px',
                size: '5px'
            });
            initCardChart();
        });

        function initCardChart() {


            //Chart Bar
            window.$('.chart.chart-bar').sparkline([6, 4, 8, 6, 8, 10, 5, 6, 7, 9, 5, 6, 4, 8, 6, 8, 10, 5, 6, 7, 9, 5], {
                type: 'bar',
                barColor: '#FF9800',
                negBarColor: '#fff',
                barWidth: '4px',
                height: '45px'
            });


            //Chart Pie
            window.$('.chart.chart-pie').sparkline([30, 35, 25, 8], {
                type: 'pie',
                height: '45px',
                sliceColors: ['#65BAF2', '#F39517', '#F44586', '#6ADF42']
            });


            //Chart Line
            window.$('.chart.chart-line').sparkline([9, 4, 6, 5, 6, 4, 7, 3], {
                type: 'line',
                width: '60px',
                height: '45px',
                lineColor: '#65BAF2',
                lineWidth: 2,
                fillColor: 'rgba(0,0,0,0)',
                spotColor: '#F39517',
                maxSpotColor: '#F39517',
                minSpotColor: '#F39517',
                spotRadius: 3,
                highlightSpotColor: '#F44586'
            });

            // live chart
            var mrefreshinterval = 500; // update display every 500ms
            var lastmousex = -1;
            var lastmousey = -1;
            var lastmousetime;
            var mousetravel = 0;
            var mpoints = [];
            var mpoints_max = 30;
            window.$('html').on("mousemove", function (e) {
                var mousex = e.pageX;
                var mousey = e.pageY;
                if (lastmousex > -1) {
                    mousetravel += Math.max(Math.abs(mousex - lastmousex), Math.abs(mousey - lastmousey));
                }
                lastmousex = mousex;
                lastmousey = mousey;
            });
            var mdraw = function () {
                var md = new Date();
                var timenow = md.getTime();
                if (lastmousetime && lastmousetime != timenow) {
                    var pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000);
                    mpoints.push(pps);
                    if (mpoints.length > mpoints_max)
                        mpoints.splice(0, 1);
                    mousetravel = 0;
                    window.$('#liveChart').sparkline(mpoints, {
                        width: mpoints.length * 2,
                        height: '45px',
                        tooltipSuffix: ' pixels per second'
                    });
                }
                lastmousetime = timenow;
                setTimeout(mdraw, mrefreshinterval);
            };
            // We could use setInterval instead, but I prefer to do it this way
            setTimeout(mdraw, mrefreshinterval);
        }
    }

    componentDidMount() {
        this.js()
    }
    render() {
        return (
            <div className="row">
                <div className="col-lg-3 col-sm-6">
                    <div className="counter-box text-center white">
                        <div className="text font-17 m-b-5">Total Income</div>
                        <h3 className="m-b-10">$758
                    <i className="material-icons col-green">trending_up</i>
                        </h3>
                        <div className="icon">
                            <div className="chart chart-pie" />
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <div className="counter-box text-center white">
                        <div className="text font-17 m-b-5">Total Bookings</div>
                        <h3 className="m-b-10">1025
                    <i className="material-icons col-green">trending_up</i>
                        </h3>
                        <div className="icon">
                            <span className="chart chart-bar" />
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <div className="counter-box text-center white">
                        <div className="text font-17 m-b-5">Cancelled Bookings</div>
                        <h3 className="m-b-10">956
                    <i className="material-icons col-red">trending_down</i>
                        </h3>
                        <div className="icon">
                            <div className="chart chart-line" />
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <div className="counter-box text-center white">
                        <div className="text font-17 m-b-5">Total registered Users</div>
                        <h3 className="m-b-10">214
                    <i className="material-icons col-red">trending_down</i>
                        </h3>
                        <div className="icon">
                            <div className="chart" id="liveChart">Loading..</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Widget;