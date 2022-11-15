import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../../Store/store'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InsightsIcon from '@mui/icons-material/Insights'
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined'
import { Outlet } from 'react-router-dom'


import InstrumentQuotesContextProvider from '../../assignment_dashboard/Context/Instrument_Quotes_context'
const drawerWidth = 200

const onOpenStyling = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
})

const onCloseStyling = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
})

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}))


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...onOpenStyling(theme),
			'& .MuiDrawer-paper': onOpenStyling(theme),
		}),
		...(!open && {
			...onCloseStyling(theme),
			'& .MuiDrawer-paper': onCloseStyling(theme),
		}),
	}),
)

export default function App_Layout() {

	const theme = useTheme()
	const [open, setOpen] = React.useState(false)

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	return (

		<div>
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: 'none' }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
      Assignment Application
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{['Stocks', 'Quotes'].map((text, index) => (
						<ListItem key={text}

							disablePadding
							component={Link}
							to={`/${text.toLocaleLowerCase()}`}
							sx={{ display: 'block', paddingBottom: '20px' }}>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? 'initial' : 'center',
									px: 2.5,
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center',
									}}
								>
									{index % 2 === 0 ? <InsightsIcon /> : <RequestQuoteOutlinedIcon />}
								</ListItemIcon>
								<ListItemText style={{ textDecoration: 'none' }} primary={text.toLocaleUpperCase()} sx={{ opacity: open ? 1 : 0 }} />
							</ListItemButton>
						</ListItem>
					))}
				</List>

				{/* // open ? "1% 6% 6% 16% " : '1% 4% 6% 6%', transition: "margin .1s ease-in-out" } */}

			</Drawer>

			<DrawerHeader />

			<div style={{ marginLeft: open ? '13.5rem' : '5rem', marginTop: '1.2rem', marginRight: '1.2rem', transition: 'margin .1s ease-in-out' }}>
				<Provider store={store}>
					<InstrumentQuotesContextProvider>
						<Outlet />
					</InstrumentQuotesContextProvider>
				</Provider>
			</div>

		</div >

	)
}