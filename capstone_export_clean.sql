--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_pollforms_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pollforms_status AS ENUM (
    'draft',
    'published',
    'ended'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: draftVotes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."draftVotes" (
    draft_id integer NOT NULL,
    user_id integer NOT NULL,
    "pollForm_id" integer NOT NULL,
    response json,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: draftVotes_draft_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."draftVotes_draft_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: draftVotes_draft_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."draftVotes_draft_id_seq" OWNED BY public."draftVotes".draft_id;


--
-- Name: pollelements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pollelements (
    element_id integer NOT NULL,
    "PollFormId" integer,
    option character varying(255) NOT NULL,
    info text,
    clicked boolean DEFAULT false,
    picture character varying(255),
    created_at timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: pollelements_element_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pollelements_element_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pollelements_element_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pollelements_element_id_seq OWNED BY public.pollelements.element_id;


--
-- Name: pollforms; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pollforms (
    "pollForm_id" integer NOT NULL,
    disabled boolean DEFAULT false,
    private boolean DEFAULT false,
    title character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    status public.enum_pollforms_status DEFAULT 'draft'::public.enum_pollforms_status,
    "endDate" timestamp with time zone,
    creator_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: pollforms_pollForm_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."pollforms_pollForm_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pollforms_pollForm_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."pollforms_pollForm_id_seq" OWNED BY public.pollforms."pollForm_id";


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "isAdmin" boolean DEFAULT false,
    disabled boolean DEFAULT false,
    username character varying(255) NOT NULL,
    "firstName" character varying(255),
    "lastName" character varying(255),
    email character varying(255),
    "profilePicture" character varying(255),
    "auth0Id" character varying(255),
    "passwordHash" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: voteRanks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."voteRanks" (
    vote_rank_id integer NOT NULL,
    vote_id integer,
    element_id integer,
    rank integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: voteRanks_vote_rank_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."voteRanks_vote_rank_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: voteRanks_vote_rank_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."voteRanks_vote_rank_id_seq" OWNED BY public."voteRanks".vote_rank_id;


--
-- Name: votes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.votes (
    "Vote_id" integer NOT NULL,
    "voterToken" character varying(255),
    user_id integer,
    "pollForm_id" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: votes_Vote_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."votes_Vote_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: votes_Vote_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."votes_Vote_id_seq" OWNED BY public.votes."Vote_id";


--
-- Name: draftVotes draft_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."draftVotes" ALTER COLUMN draft_id SET DEFAULT nextval('public."draftVotes_draft_id_seq"'::regclass);


--
-- Name: pollelements element_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pollelements ALTER COLUMN element_id SET DEFAULT nextval('public.pollelements_element_id_seq'::regclass);


--
-- Name: pollforms pollForm_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pollforms ALTER COLUMN "pollForm_id" SET DEFAULT nextval('public."pollforms_pollForm_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: voteRanks vote_rank_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."voteRanks" ALTER COLUMN vote_rank_id SET DEFAULT nextval('public."voteRanks_vote_rank_id_seq"'::regclass);


--
-- Name: votes Vote_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votes ALTER COLUMN "Vote_id" SET DEFAULT nextval('public."votes_Vote_id_seq"'::regclass);


--
-- Data for Name: draftVotes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."draftVotes" (draft_id, user_id, "pollForm_id", response, "createdAt", "updatedAt") FROM stdin;
3	1	23	[{"elementId":50,"rank":1}]	2025-07-27 22:24:21.268-04	2025-07-27 22:24:25.572-04
\.


--
-- Data for Name: pollelements; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pollelements (element_id, "PollFormId", option, info, clicked, picture, created_at, "createdAt", "updatedAt") FROM stdin;
18	\N	CCGGGC	GCGC	f	http://localhost:3000/#/pollmaker	2025-07-27 20:03:00.431-04	2025-07-27 20:03:00.456-04	2025-07-27 20:03:00.456-04
19	\N	CGCGCG	sdsd	f	https://placehold.co/600x400	2025-07-27 20:03:00.431-04	2025-07-27 20:03:00.456-04	2025-07-27 20:03:00.456-04
21	\N	SDFDFCCCC	SDFSDFCCC	f	http://localhost:3000/#/pollmaker	2025-07-27 20:03:09.64-04	2025-07-27 20:03:09.647-04	2025-07-27 20:03:09.647-04
3	\N	sdsds	sdsd	f	http://localhost:3000/#/pollmaker	2025-07-27 19:52:53.415-04	2025-07-27 19:52:53.449-04	2025-07-27 19:52:53.449-04
4	\N	sdsd	sddsd	f	https://placehold.co/600x400	2025-07-27 19:52:53.415-04	2025-07-27 19:52:53.449-04	2025-07-27 19:52:53.449-04
5	\N	sds	sdsd	f	http://localhost:3000/#/pollmaker	2025-07-27 20:00:09.875-04	2025-07-27 20:00:09.911-04	2025-07-27 20:00:09.911-04
6	\N	sdds	dsd	f	https://placehold.co/600x400	2025-07-27 20:00:09.875-04	2025-07-27 20:00:09.911-04	2025-07-27 20:00:09.911-04
9	\N	sdsdssd	sdsd	f	http://localhost:3000/#/pollmaker	2025-07-27 20:00:38.239-04	2025-07-27 20:00:38.264-04	2025-07-27 20:00:38.264-04
10	\N	sdsddfd	sdsdddfd	f	http://localhost:3000/#/pollmaker	2025-07-27 20:00:46.799-04	2025-07-27 20:00:46.806-04	2025-07-27 20:00:46.806-04
12	\N	sddsdfdf	dsddfdfdfdfd	f	https://placehold.co/600x400	2025-07-27 20:00:46.799-04	2025-07-27 20:00:46.806-04	2025-07-27 20:00:46.806-04
16	\N	YOPYOYOYOOYY	SDSDDS	f	http://localhost:3000/#/pollmaker	2025-07-27 20:01:24.468-04	2025-07-27 20:01:24.493-04	2025-07-27 20:01:24.493-04
17	\N	YEYEYEYEYEYE	SDFFGGGGGBGBBBB	f	http://localhost:3000/#/pollmaker	2025-07-27 20:01:24.468-04	2025-07-27 20:01:24.493-04	2025-07-27 20:01:24.493-04
28	\N	zxczx	zxczx	f	http://localhost:3000/#/pollmaker	2025-07-27 20:37:57.618-04	2025-07-27 20:37:57.654-04	2025-07-27 20:37:57.654-04
29	\N	xczxcxz	zxczxc	f	http://localhost:3000/#/pollmaker	2025-07-27 20:37:57.618-04	2025-07-27 20:37:57.654-04	2025-07-27 20:37:57.654-04
26	\N	dfgdf	dffgf	f	http://localhost:3000/#/pollmaker	2025-07-27 20:25:07.641-04	2025-07-27 20:25:07.669-04	2025-07-27 20:25:07.669-04
27	\N	dfgdfgfd	dfgdfg	f	http://localhost:3000/#/pollmaker	2025-07-27 20:25:07.641-04	2025-07-27 20:25:07.669-04	2025-07-27 20:25:07.669-04
1	\N	SEKIRO	fsdf	f	http://localhost:3000/#/pollmaker	2025-07-27 19:44:45.771-04	2025-07-27 19:44:45.802-04	2025-07-27 19:44:45.802-04
2	\N	sdfsdfd	dfdfd	f	http://localhost:3000/#/pollmaker	2025-07-27 19:44:45.771-04	2025-07-27 19:44:45.802-04	2025-07-27 19:44:45.802-04
32	\N	sdfdsf	sdfsdfds	f		2025-07-27 21:32:32.063-04	2025-07-27 21:32:32.065-04	2025-07-27 21:32:32.065-04
33	\N	fdsfdsf	sfdsfdsf	f		2025-07-27 21:32:32.063-04	2025-07-27 21:32:32.065-04	2025-07-27 21:32:32.065-04
35	\N	sdfsdfds	fsdfsdf	f		2025-07-27 21:32:42.338-04	2025-07-27 21:32:42.344-04	2025-07-27 21:32:42.344-04
34	\N	fsdfdsf	fsdfsdf	f		2025-07-27 21:32:42.338-04	2025-07-27 21:32:42.344-04	2025-07-27 21:32:42.344-04
42	\N	SEKIROxcxcxc	sdsdddddsdcsdcsd	f		2025-07-27 22:15:59.25-04	2025-07-27 22:15:59.376-04	2025-07-27 22:15:59.376-04
41	\N	dssddddsdsdcsdcdsc	sds	f		2025-07-27 22:15:46.771-04	2025-07-27 22:15:46.776-04	2025-07-27 22:15:46.776-04
39	\N	dssdddd	sds	f		2025-07-27 22:15:43.995-04	2025-07-27 22:15:44.02-04	2025-07-27 22:15:44.02-04
30	\N	cvbcv	cvbcvb	f		2025-07-27 21:30:55.649-04	2025-07-27 21:30:55.655-04	2025-07-27 21:30:55.655-04
31	\N	vbcvb	cvcbvcbcv	f		2025-07-27 21:30:55.649-04	2025-07-27 21:30:55.655-04	2025-07-27 21:30:55.655-04
37	\N	dssd	sds	f		2025-07-27 22:15:32.824-04	2025-07-27 22:15:32.828-04	2025-07-27 22:15:32.828-04
48	\N	xcvcxv	cxvxcv	f		2025-07-27 22:21:12.906-04	2025-07-27 22:21:12.911-04	2025-07-27 22:21:12.911-04
49	\N	xcvcx	cvxv	f		2025-07-27 22:21:12.906-04	2025-07-27 22:21:12.911-04	2025-07-27 22:21:12.911-04
50	23	czxc	xzxcxz	f		2025-07-27 22:21:30.057-04	2025-07-27 22:21:30.058-04	2025-07-27 22:21:30.058-04
51	23	zxcxzc	xczxc	f		2025-07-27 22:21:30.057-04	2025-07-27 22:21:30.058-04	2025-07-27 22:21:30.058-04
23	\N	CCGGGCLLLL	GCGCLL	f	http://localhost:3000/#/pollmaker	2025-07-27 20:03:16.443-04	2025-07-27 20:03:16.447-04	2025-07-27 20:03:16.447-04
24	\N	CGCGCGLLL	sdsd	f	https://placehold.co/600x400	2025-07-27 20:03:16.443-04	2025-07-27 20:03:16.447-04	2025-07-27 20:03:16.447-04
25	\N	SDFDFCCCCLL	SDFSDFCCCLLL	f	http://localhost:3000/#/pollmaker	2025-07-27 20:03:16.443-04	2025-07-27 20:03:16.447-04	2025-07-27 20:03:16.447-04
\.


--
-- Data for Name: pollforms; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pollforms ("pollForm_id", disabled, private, title, description, status, "endDate", creator_id, "createdAt", "updatedAt") FROM stdin;
23	f	t	zxcxzc	zxcxzcx	published	\N	1	2025-07-27 22:21:30.057-04	2025-07-27 22:21:31.533-04
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, "isAdmin", disabled, username, "firstName", "lastName", email, "profilePicture", "auth0Id", "passwordHash", "createdAt", "updatedAt") FROM stdin;
1	t	f	admin	\N	\N	\N	\N	\N	$2b$10$jqiwRnj1e5OWNMTEGfjDIORWOvOeVbyi9gFHlpgyVIdTBDYqjbPSa	2025-07-27 19:44:13.385-04	2025-07-27 19:44:13.385-04
2	t	f	Jocsan-Admin	\N	\N	\N	\N	\N	$2b$10$H0DREGOGVQjAaAUr5KRB6ecWx8JqMKmCFyYxVTBfZN1p75qhgxb4a	2025-07-27 19:44:13.385-04	2025-07-27 19:44:13.385-04
3	f	f	user2	\N	\N	\N	\N	\N	$2b$10$6cdX/.ew1KD.eVqOSm.P3.0Vuvab6akSYryVzxUI15U.Wd9U2BClW	2025-07-27 19:44:13.385-04	2025-07-27 19:44:13.385-04
\.


--
-- Data for Name: voteRanks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."voteRanks" (vote_rank_id, vote_id, element_id, rank, "createdAt", "updatedAt") FROM stdin;
1	\N	3	1	2025-07-27 19:52:59.914-04	2025-07-27 19:52:59.914-04
2	\N	4	2	2025-07-27 19:52:59.914-04	2025-07-27 19:52:59.914-04
3	\N	16	1	2025-07-27 20:01:40.166-04	2025-07-27 20:01:40.166-04
4	\N	17	2	2025-07-27 20:01:40.166-04	2025-07-27 20:01:40.166-04
5	\N	28	1	2025-07-27 20:38:16.028-04	2025-07-27 20:38:16.028-04
6	\N	29	2	2025-07-27 20:38:16.028-04	2025-07-27 20:38:16.028-04
9	\N	32	2	2025-07-27 21:32:51.56-04	2025-07-27 21:32:51.56-04
10	\N	33	1	2025-07-27 21:32:51.56-04	2025-07-27 21:32:51.56-04
13	\N	32	1	2025-07-27 21:33:23.342-04	2025-07-27 21:33:23.342-04
14	\N	33	2	2025-07-27 21:33:23.342-04	2025-07-27 21:33:23.342-04
15	\N	32	1	2025-07-27 21:38:37.319-04	2025-07-27 21:38:37.319-04
16	\N	33	2	2025-07-27 21:38:37.319-04	2025-07-27 21:38:37.319-04
11	\N	34	2	2025-07-27 21:33:17.157-04	2025-07-27 21:33:17.157-04
12	\N	35	1	2025-07-27 21:33:17.157-04	2025-07-27 21:33:17.157-04
7	\N	30	1	2025-07-27 21:31:01.969-04	2025-07-27 21:31:01.969-04
8	\N	31	2	2025-07-27 21:31:01.969-04	2025-07-27 21:31:01.969-04
\.


--
-- Data for Name: votes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.votes ("Vote_id", "voterToken", user_id, "pollForm_id", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: draftVotes_draft_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."draftVotes_draft_id_seq"', 3, true);


--
-- Name: pollelements_element_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pollelements_element_id_seq', 51, true);


--
-- Name: pollforms_pollForm_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."pollforms_pollForm_id_seq"', 23, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: voteRanks_vote_rank_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."voteRanks_vote_rank_id_seq"', 16, true);


--
-- Name: votes_Vote_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."votes_Vote_id_seq"', 8, true);


--
-- Name: draftVotes draftVotes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."draftVotes"
    ADD CONSTRAINT "draftVotes_pkey" PRIMARY KEY (draft_id);


--
-- Name: pollelements pollelements_option_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pollelements
    ADD CONSTRAINT pollelements_option_key UNIQUE (option);


--
-- Name: pollelements pollelements_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pollelements
    ADD CONSTRAINT pollelements_pkey PRIMARY KEY (element_id);


--
-- Name: pollforms pollforms_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pollforms
    ADD CONSTRAINT pollforms_pkey PRIMARY KEY ("pollForm_id");


--
-- Name: users users_auth0Id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_auth0Id_key" UNIQUE ("auth0Id");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: voteRanks voteRanks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."voteRanks"
    ADD CONSTRAINT "voteRanks_pkey" PRIMARY KEY (vote_rank_id);


--
-- Name: votes votes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_pkey PRIMARY KEY ("Vote_id");


--
-- Name: votes votes_voterToken_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT "votes_voterToken_key" UNIQUE ("voterToken");


--
-- Name: pollelements__poll_form_id_option; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX pollelements__poll_form_id_option ON public.pollelements USING btree ("PollFormId", option);


--
-- Name: draftVotes draftVotes_pollForms_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."draftVotes"
    ADD CONSTRAINT "draftVotes_pollForms_id_fkey" FOREIGN KEY ("pollForm_id") REFERENCES public.pollforms("pollForm_id") ON DELETE CASCADE;


--
-- Name: draftVotes draftVotes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."draftVotes"
    ADD CONSTRAINT "draftVotes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: pollelements pollelements_PollFormId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pollelements
    ADD CONSTRAINT "pollelements_PollFormId_fkey" FOREIGN KEY ("PollFormId") REFERENCES public.pollforms("pollForm_id") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: pollforms pollforms_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pollforms
    ADD CONSTRAINT pollforms_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: voteRanks voteRanks_element_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."voteRanks"
    ADD CONSTRAINT "voteRanks_element_id_fkey" FOREIGN KEY (element_id) REFERENCES public.pollelements(element_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: voteRanks voteRanks_vote_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."voteRanks"
    ADD CONSTRAINT "voteRanks_vote_id_fkey" FOREIGN KEY (vote_id) REFERENCES public.votes("Vote_id") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: votes votes_pollForm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT "votes_pollForm_id_fkey" FOREIGN KEY ("pollForm_id") REFERENCES public.pollforms("pollForm_id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: votes votes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

