import mock from '@/fake-db/mock.js'

const data = {
    dispatchedOrders: [{
            orderNo: 879985,
            status: 'Đã hoàn thành',
            statusColor: 'success',
            operator: 'Nguyễn Thanh Chương',
            operatorImg: require('@/assets/images/portrait/small/avatar-s-2.jpg'),
            usersLiked: [{
                    name: 'Xí nghiệp Trắc địa',
                    img: require('@/assets/images/portrait/small/avatar-s-5.jpg')
                },
                {
                    name: 'Nguyễn Thanh Chương',
                    img: require('@/assets/images/portrait/small/avatar-s-7.jpg')
                },
                // {
                //   name: 'Julee Rossignol',
                //   img: require('@/assets/images/portrait/small/avatar-s-10.jpg')
                // },
                // {
                //   name: 'Darcey Nooner',
                //   img: require('@/assets/images/portrait/small/avatar-s-8.jpg')
                // }
            ],
            location: 'Công việc 2',
            distance: '130 km',
            distPercent: 80,
            startDate: '26/07/2018',
            estDelDate: '28/07/2018'
        },
        {
            orderNo: 156897,
            status: 'Cảnh báo',
            statusColor: 'warning',
            operator: 'Trần Đăng Ninh',
            operatorImg: require('@/assets/images/portrait/small/avatar-s-4.jpg'),
            usersLiked: [{
                    name: 'Xí nghiệp chụp ảnh hàng không',
                    img: require('@/assets/images/portrait/small/avatar-s-1.jpg')
                },
                {
                    name: 'Trần Đăng Ninh',
                    img: require('@/assets/images/portrait/small/avatar-s-2.jpg')
                },
                // {
                //   name: 'Alberto Glotzbach',
                //   img: require('@/assets/images/portrait/small/avatar-s-3.jpg')
                // }
            ],
            location: 'Công việc 1',
            distance: '234 km',
            distPercent: 60,
            startDate: '26/07/2018',
            estDelDate: '28/07/2018'
        },
        {
            orderNo: 568975,
            status: 'Đang thực hiện',
            statusColor: 'primary',
            operator: 'Kishan Ashton',
            operatorImg: require('@/assets/images/portrait/small/avatar-s-1.jpg'),
            usersLiked: [{
                    name: 'Xí nghiệp phát triển công nghệ',
                    img: require('@/assets/images/portrait/small/avatar-s-6.jpg')
                },
                {
                    name: 'Hoàng Minh Tân',
                    img: require('@/assets/images/portrait/small/avatar-s-7.jpg')
                },
                // {
                //   name: 'Darcey Nooner',
                //   img: require('@/assets/images/portrait/small/avatar-s-8.jpg')
                // },
                // {
                //   name: 'Julee Rossignol',
                //   img: require('@/assets/images/portrait/small/avatar-s-10.jpg')
                // },
                // {
                //   name: 'Jeffrey Gerondale',
                //   img: require('@/assets/images/portrait/small/avatar-s-9.jpg')
                // }
            ],
            location: 'Công việc 3',
            distance: '168 km',
            distPercent: 70,
            startDate: '26/07/2018',
            estDelDate: '28/07/2018'
        },
        {
            orderNo: 245689,
            status: 'Quá hạn',
            statusColor: 'danger',
            operator: 'Anabella Elliott',
            operatorImg: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
            usersLiked: [{
                    name: 'Xí nghiệp bản đồ 1',
                    img: require('@/assets/images/portrait/small/avatar-s-5.jpg')
                },
                {
                    name: 'Long',
                    img: require('@/assets/images/portrait/small/avatar-s-7.jpg')
                }
            ],
            location: 'Công việc 4',
            distance: '125 km',
            distPercent: 75,
            startDate: '26/07/2018',
            estDelDate: '28/07/2018'
        },
        {
            orderNo: 879985,
            status: 'Đã hoàn thành',
            statusColor: 'success',
            operator: 'Cinar Knowles',
            operatorImg: require('@/assets/images/portrait/small/avatar-s-2.jpg'),
            usersLiked: [{
                    name: 'Xí nghiệp Trắc địa',
                    img: require('@/assets/images/portrait/small/avatar-s-5.jpg')
                },
                {
                    name: 'Nguyễn Thanh Chương',
                    img: require('@/assets/images/portrait/small/avatar-s-7.jpg')
                },
                // {
                //   name: 'Julee Rossignol',
                //   img: require('@/assets/images/portrait/small/avatar-s-10.jpg')
                // },
                // {
                //   name: 'Darcey Nooner',
                //   img: require('@/assets/images/portrait/small/avatar-s-8.jpg')
                // }
            ],
            location: 'Công việc 2',
            distance: '130 km',
            distPercent: 80,
            startDate: '26/07/2018',
            estDelDate: '28/07/2018'
        },
        {
            orderNo: 156897,
            status: 'Cảnh báo',
            statusColor: 'warning',
            operator: 'Britany Ryder',
            operatorImg: require('@/assets/images/portrait/small/avatar-s-4.jpg'),
            usersLiked: [{
                    name: 'Xí nghiệp chụp ảnh hàng không',
                    img: require('@/assets/images/portrait/small/avatar-s-1.jpg')
                },
                {
                    name: 'Trần Đăng Ninh',
                    img: require('@/assets/images/portrait/small/avatar-s-2.jpg')
                },
                // {
                //   name: 'Alberto Glotzbach',
                //   img: require('@/assets/images/portrait/small/avatar-s-3.jpg')
                // }
            ],
            location: 'Công việc 1',
            distance: '234 km',
            distPercent: 60,
            startDate: '26/07/2018',
            estDelDate: '28/07/2018'
        },
        {
            orderNo: 568975,
            status: 'Đang thực hiện',
            statusColor: 'primary',
            operator: 'Kishan Ashton',
            operatorImg: require('@/assets/images/portrait/small/avatar-s-1.jpg'),
            usersLiked: [{
                    name: 'Xí nghiệp phát triển công nghệ',
                    img: require('@/assets/images/portrait/small/avatar-s-6.jpg')
                },
                {
                    name: 'Hoàng Minh Tân',
                    img: require('@/assets/images/portrait/small/avatar-s-7.jpg')
                },
                // {
                //   name: 'Darcey Nooner',
                //   img: require('@/assets/images/portrait/small/avatar-s-8.jpg')
                // },
                // {
                //   name: 'Julee Rossignol',
                //   img: require('@/assets/images/portrait/small/avatar-s-10.jpg')
                // },
                // {
                //   name: 'Jeffrey Gerondale',
                //   img: require('@/assets/images/portrait/small/avatar-s-9.jpg')
                // }
            ],
            location: 'Công việc 3',
            distance: '168 km',
            distPercent: 70,
            startDate: '26/07/2018',
            estDelDate: '28/07/2018'
        },
        {
            orderNo: 245689,
            status: 'Quá hạn',
            statusColor: 'danger',
            operator: 'Anabella Elliott',
            operatorImg: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
            usersLiked: [{
                    name: 'Xí nghiệp bản đồ 1',
                    img: require('@/assets/images/portrait/small/avatar-s-5.jpg')
                },
                {
                    name: 'Long',
                    img: require('@/assets/images/portrait/small/avatar-s-7.jpg')
                }
            ],
            location: 'Công việc 4',
            distance: '125 km',
            distPercent: 75,
            startDate: '26/07/2018',
            estDelDate: '28/07/2018'
        },
        {
            orderNo: 879985,
            status: 'Đã hoàn thành',
            statusColor: 'success',
            operator: 'Cinar Knowles',
            operatorImg: require('@/assets/images/portrait/small/avatar-s-2.jpg'),
            usersLiked: [{
                    name: 'Xí nghiệp Trắc địa',
                    img: require('@/assets/images/portrait/small/avatar-s-5.jpg')
                },
                {
                    name: 'Nguyễn Thanh Chương',
                    img: require('@/assets/images/portrait/small/avatar-s-7.jpg')
                },
                // {
                //   name: 'Julee Rossignol',
                //   img: require('@/assets/images/portrait/small/avatar-s-10.jpg')
                // },
                // {
                //   name: 'Darcey Nooner',
                //   img: require('@/assets/images/portrait/small/avatar-s-8.jpg')
                // }
            ],
            location: 'Công việc 2',
            distance: '130 km',
            distPercent: 80,
            startDate: '26/07/2018',
            estDelDate: '28/07/2018'
        },
        {
            orderNo: 156897,
            status: 'Cảnh báo',
            statusColor: 'warning',
            operator: 'Britany Ryder',
            operatorImg: require('@/assets/images/portrait/small/avatar-s-4.jpg'),
            usersLiked: [{
                    name: 'Xí nghiệp chụp ảnh hàng không',
                    img: require('@/assets/images/portrait/small/avatar-s-1.jpg')
                },
                {
                    name: 'Trần Đăng Ninh',
                    img: require('@/assets/images/portrait/small/avatar-s-2.jpg')
                },
                // {
                //   name: 'Alberto Glotzbach',
                //   img: require('@/assets/images/portrait/small/avatar-s-3.jpg')
                // }
            ],
            location: 'Công việc 1',
            distance: '234 km',
            distPercent: 60,
            startDate: '26/07/2018',
            estDelDate: '28/07/2018'
        },
        {
            orderNo: 568975,
            status: 'Đang thực hiện',
            statusColor: 'primary',
            operator: 'Kishan Ashton',
            operatorImg: require('@/assets/images/portrait/small/avatar-s-1.jpg'),
            usersLiked: [{
                    name: 'Xí nghiệp phát triển công nghệ',
                    img: require('@/assets/images/portrait/small/avatar-s-6.jpg')
                },
                {
                    name: 'Hoàng Minh Tân',
                    img: require('@/assets/images/portrait/small/avatar-s-7.jpg')
                },
                // {
                //   name: 'Darcey Nooner',
                //   img: require('@/assets/images/portrait/small/avatar-s-8.jpg')
                // },
                // {
                //   name: 'Julee Rossignol',
                //   img: require('@/assets/images/portrait/small/avatar-s-10.jpg')
                // },
                // {
                //   name: 'Jeffrey Gerondale',
                //   img: require('@/assets/images/portrait/small/avatar-s-9.jpg')
                // }
            ],
            location: 'Công việc 3',
            distance: '168 km',
            distPercent: 70,
            startDate: '26/07/2018',
            estDelDate: '28/07/2018'
        },
        {
            orderNo: 245689,
            status: 'Quá hạn',
            statusColor: 'danger',
            operator: 'Anabella Elliott',
            operatorImg: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
            usersLiked: [{
                    name: 'Xí nghiệp bản đồ 1',
                    img: require('@/assets/images/portrait/small/avatar-s-5.jpg')
                },
                {
                    name: 'Long',
                    img: require('@/assets/images/portrait/small/avatar-s-7.jpg')
                }
            ],
            location: 'Công việc 4',
            distance: '125 km',
            distPercent: 75,
            startDate: '26/07/2018',
            estDelDate: '28/07/2018'
        },
    ]
}


mock.onGet('/api/table/dispatched-orders').reply(() => {
    return [200, data.dispatchedOrders]
})