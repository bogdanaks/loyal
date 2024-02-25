PGDMP     /                    |            loyal    14.3    14.3 N    a           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            b           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            c           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            d           1262    17095    loyal    DATABASE     b   CREATE DATABASE loyal WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';
    DROP DATABASE loyal;
                postgres    false            �            1259    17096    account_business    TABLE     \  CREATE TABLE public.account_business (
    id bigint NOT NULL,
    name character varying(100),
    phone character varying(11),
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
 $   DROP TABLE public.account_business;
       public         heap    postgres    false            �            1259    17101    account_business_id_seq    SEQUENCE     �   CREATE SEQUENCE public.account_business_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.account_business_id_seq;
       public          postgres    false    209            e           0    0    account_business_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.account_business_id_seq OWNED BY public.account_business.id;
          public          postgres    false    210            �            1259    17102    account_user    TABLE     �  CREATE TABLE public.account_user (
    id integer NOT NULL,
    tg_user_id bigint,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    birthday date,
    phone character varying(11) NOT NULL,
    photo character varying(100),
    first_name character varying(100) NOT NULL,
    last_name character varying(100),
    tg_username character varying(100),
    email character varying(100)
);
     DROP TABLE public.account_user;
       public         heap    postgres    false            �            1259    17109 	   shop_type    TABLE     �   CREATE TABLE public.shop_type (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.shop_type;
       public         heap    postgres    false            �            1259    17114    business_type_id_seq    SEQUENCE     }   CREATE SEQUENCE public.business_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.business_type_id_seq;
       public          postgres    false    212            f           0    0    business_type_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.business_type_id_seq OWNED BY public.shop_type.id;
          public          postgres    false    213            �            1259    17115    loyal_program    TABLE     '  CREATE TABLE public.loyal_program (
    id bigint NOT NULL,
    loyal_type_id bigint NOT NULL,
    percent_bonus smallint NOT NULL,
    reg_bonus smallint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
 !   DROP TABLE public.loyal_program;
       public         heap    postgres    false            �            1259    17120    loyal_program_id_seq    SEQUENCE     }   CREATE SEQUENCE public.loyal_program_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.loyal_program_id_seq;
       public          postgres    false    214            g           0    0    loyal_program_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.loyal_program_id_seq OWNED BY public.loyal_program.id;
          public          postgres    false    215            �            1259    17121 
   loyal_type    TABLE     5  CREATE TABLE public.loyal_type (
    id bigint NOT NULL,
    title character varying(100) NOT NULL,
    icon character varying(100) DEFAULT 'default'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.loyal_type;
       public         heap    postgres    false            �            1259    17127    loyal_type_id_seq    SEQUENCE     z   CREATE SEQUENCE public.loyal_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.loyal_type_id_seq;
       public          postgres    false    216            h           0    0    loyal_type_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.loyal_type_id_seq OWNED BY public.loyal_type.id;
          public          postgres    false    217            �            1259    17128    shop    TABLE       CREATE TABLE public.shop (
    id bigint NOT NULL,
    owner_id bigint,
    type_id bigint,
    status_id bigint,
    title character varying(100),
    working_hours jsonb,
    short_description character varying(100),
    description character varying(150),
    photo character varying(100),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    banners jsonb,
    phone character varying(10),
    address character varying(100),
    loyal_program_id bigint
);
    DROP TABLE public.shop;
       public         heap    postgres    false            �            1259    17135    shop_2_id_seq    SEQUENCE     v   CREATE SEQUENCE public.shop_2_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.shop_2_id_seq;
       public          postgres    false    218            i           0    0    shop_2_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.shop_2_id_seq OWNED BY public.shop.id;
          public          postgres    false    219            �            1259    17136    shop_client    TABLE     -  CREATE TABLE public.shop_client (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    balance bigint DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.shop_client;
       public         heap    postgres    false            �            1259    17143    shop_client_id_seq    SEQUENCE     {   CREATE SEQUENCE public.shop_client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.shop_client_id_seq;
       public          postgres    false    220            j           0    0    shop_client_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.shop_client_id_seq OWNED BY public.shop_client.id;
          public          postgres    false    221            �            1259    17144    shop_status    TABLE       CREATE TABLE public.shop_status (
    id bigint NOT NULL,
    title character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    is_default boolean NOT NULL
);
    DROP TABLE public.shop_status;
       public         heap    postgres    false            �            1259    17149    shop_status_id_seq    SEQUENCE     {   CREATE SEQUENCE public.shop_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.shop_status_id_seq;
       public          postgres    false    222            k           0    0    shop_status_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.shop_status_id_seq OWNED BY public.shop_status.id;
          public          postgres    false    223            �            1259    17150    transaction    TABLE     ~  CREATE TABLE public.transaction (
    id bigint NOT NULL,
    shop_id bigint NOT NULL,
    user_id bigint NOT NULL,
    loyal_type_id bigint NOT NULL,
    is_accrual boolean NOT NULL,
    check_amount bigint NOT NULL,
    bonus_amount bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.transaction;
       public         heap    postgres    false            �            1259    17155    transaction_id_seq    SEQUENCE     {   CREATE SEQUENCE public.transaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.transaction_id_seq;
       public          postgres    false    224            l           0    0    transaction_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.transaction_id_seq OWNED BY public.transaction.id;
          public          postgres    false    225            �            1259    17156    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    211            m           0    0    user_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.user_id_seq OWNED BY public.account_user.id;
          public          postgres    false    226            �           2604    17157    account_business id    DEFAULT     z   ALTER TABLE ONLY public.account_business ALTER COLUMN id SET DEFAULT nextval('public.account_business_id_seq'::regclass);
 B   ALTER TABLE public.account_business ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209            �           2604    17158    account_user id    DEFAULT     j   ALTER TABLE ONLY public.account_user ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 >   ALTER TABLE public.account_user ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    211            �           2604    17159    loyal_program id    DEFAULT     t   ALTER TABLE ONLY public.loyal_program ALTER COLUMN id SET DEFAULT nextval('public.loyal_program_id_seq'::regclass);
 ?   ALTER TABLE public.loyal_program ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214            �           2604    17160    loyal_type id    DEFAULT     n   ALTER TABLE ONLY public.loyal_type ALTER COLUMN id SET DEFAULT nextval('public.loyal_type_id_seq'::regclass);
 <   ALTER TABLE public.loyal_type ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216            �           2604    17161    shop id    DEFAULT     d   ALTER TABLE ONLY public.shop ALTER COLUMN id SET DEFAULT nextval('public.shop_2_id_seq'::regclass);
 6   ALTER TABLE public.shop ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218            �           2604    17162    shop_client id    DEFAULT     p   ALTER TABLE ONLY public.shop_client ALTER COLUMN id SET DEFAULT nextval('public.shop_client_id_seq'::regclass);
 =   ALTER TABLE public.shop_client ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220            �           2604    17163    shop_status id    DEFAULT     p   ALTER TABLE ONLY public.shop_status ALTER COLUMN id SET DEFAULT nextval('public.shop_status_id_seq'::regclass);
 =   ALTER TABLE public.shop_status ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222            �           2604    17164    shop_type id    DEFAULT     p   ALTER TABLE ONLY public.shop_type ALTER COLUMN id SET DEFAULT nextval('public.business_type_id_seq'::regclass);
 ;   ALTER TABLE public.shop_type ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    212            �           2604    17165    transaction id    DEFAULT     p   ALTER TABLE ONLY public.transaction ALTER COLUMN id SET DEFAULT nextval('public.transaction_id_seq'::regclass);
 =   ALTER TABLE public.transaction ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224            M          0    17096    account_business 
   TABLE DATA           d   COPY public.account_business (id, name, phone, email, password, created_at, updated_at) FROM stdin;
    public          postgres    false    209   _       O          0    17102    account_user 
   TABLE DATA           �   COPY public.account_user (id, tg_user_id, created_at, updated_at, birthday, phone, photo, first_name, last_name, tg_username, email) FROM stdin;
    public          postgres    false    211   �_       R          0    17115    loyal_program 
   TABLE DATA           l   COPY public.loyal_program (id, loyal_type_id, percent_bonus, reg_bonus, created_at, updated_at) FROM stdin;
    public          postgres    false    214   [`       T          0    17121 
   loyal_type 
   TABLE DATA           M   COPY public.loyal_type (id, title, icon, created_at, updated_at) FROM stdin;
    public          postgres    false    216   �`       V          0    17128    shop 
   TABLE DATA           �   COPY public.shop (id, owner_id, type_id, status_id, title, working_hours, short_description, description, photo, created_at, updated_at, banners, phone, address, loyal_program_id) FROM stdin;
    public          postgres    false    218   a       X          0    17136    shop_client 
   TABLE DATA           ^   COPY public.shop_client (id, user_id, balance, is_active, created_at, updated_at) FROM stdin;
    public          postgres    false    220   sb       Z          0    17144    shop_status 
   TABLE DATA           T   COPY public.shop_status (id, title, created_at, updated_at, is_default) FROM stdin;
    public          postgres    false    222   �b       P          0    17109 	   shop_type 
   TABLE DATA           F   COPY public.shop_type (id, title, created_at, updated_at) FROM stdin;
    public          postgres    false    212   c       \          0    17150    transaction 
   TABLE DATA           �   COPY public.transaction (id, shop_id, user_id, loyal_type_id, is_accrual, check_amount, bonus_amount, created_at, updated_at) FROM stdin;
    public          postgres    false    224   �c       n           0    0    account_business_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.account_business_id_seq', 54, true);
          public          postgres    false    210            o           0    0    business_type_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.business_type_id_seq', 10, true);
          public          postgres    false    213            p           0    0    loyal_program_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.loyal_program_id_seq', 9, true);
          public          postgres    false    215            q           0    0    loyal_type_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.loyal_type_id_seq', 3, true);
          public          postgres    false    217            r           0    0    shop_2_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.shop_2_id_seq', 1, true);
          public          postgres    false    219            s           0    0    shop_client_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.shop_client_id_seq', 27, true);
          public          postgres    false    221            t           0    0    shop_status_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.shop_status_id_seq', 3, true);
          public          postgres    false    223            u           0    0    transaction_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.transaction_id_seq', 51, true);
          public          postgres    false    225            v           0    0    user_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.user_id_seq', 100027, true);
          public          postgres    false    226            �           2606    17167 +   account_user PK_cace4a159ff9f2512dd42373760 
   CONSTRAINT     k   ALTER TABLE ONLY public.account_user
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);
 W   ALTER TABLE ONLY public.account_user DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
       public            postgres    false    211            �           2606    17169 &   account_business account_business_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.account_business
    ADD CONSTRAINT account_business_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.account_business DROP CONSTRAINT account_business_pkey;
       public            postgres    false    209            �           2606    17171    shop_type business_type_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.shop_type
    ADD CONSTRAINT business_type_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.shop_type DROP CONSTRAINT business_type_pkey;
       public            postgres    false    212            �           2606    17173    account_business email_uniq 
   CONSTRAINT     g   ALTER TABLE ONLY public.account_business
    ADD CONSTRAINT email_uniq UNIQUE (email) INCLUDE (email);
 E   ALTER TABLE ONLY public.account_business DROP CONSTRAINT email_uniq;
       public            postgres    false    209            �           2606    17175     loyal_program loyal_program_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.loyal_program
    ADD CONSTRAINT loyal_program_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.loyal_program DROP CONSTRAINT loyal_program_pkey;
       public            postgres    false    214            �           2606    17177    loyal_type loyal_type_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.loyal_type
    ADD CONSTRAINT loyal_type_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.loyal_type DROP CONSTRAINT loyal_type_pkey;
       public            postgres    false    216            �           2606    17179    account_business phone_uniq 
   CONSTRAINT     g   ALTER TABLE ONLY public.account_business
    ADD CONSTRAINT phone_uniq UNIQUE (phone) INCLUDE (phone);
 E   ALTER TABLE ONLY public.account_business DROP CONSTRAINT phone_uniq;
       public            postgres    false    209            �           2606    17181    shop shop_2_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.shop
    ADD CONSTRAINT shop_2_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.shop DROP CONSTRAINT shop_2_pkey;
       public            postgres    false    218            �           2606    17183    shop_client shop_client_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.shop_client
    ADD CONSTRAINT shop_client_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.shop_client DROP CONSTRAINT shop_client_pkey;
       public            postgres    false    220            �           2606    17185    shop_status shop_status_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.shop_status
    ADD CONSTRAINT shop_status_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.shop_status DROP CONSTRAINT shop_status_pkey;
       public            postgres    false    222            �           2606    17187    account_user tg_user_id 
   CONSTRAINT     m   ALTER TABLE ONLY public.account_user
    ADD CONSTRAINT tg_user_id UNIQUE (tg_user_id) INCLUDE (tg_user_id);
 A   ALTER TABLE ONLY public.account_user DROP CONSTRAINT tg_user_id;
       public            postgres    false    211            �           2606    17189    transaction transaction_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.transaction DROP CONSTRAINT transaction_pkey;
       public            postgres    false    224            �           2606    17238    shop loyal_program_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.shop
    ADD CONSTRAINT loyal_program_id_fk FOREIGN KEY (loyal_program_id) REFERENCES public.loyal_program(id) NOT VALID;
 B   ALTER TABLE ONLY public.shop DROP CONSTRAINT loyal_program_id_fk;
       public          postgres    false    3247    214    218            �           2606    17190    loyal_program loyal_type_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.loyal_program
    ADD CONSTRAINT loyal_type_id_fk FOREIGN KEY (loyal_type_id) REFERENCES public.loyal_type(id) NOT VALID;
 H   ALTER TABLE ONLY public.loyal_program DROP CONSTRAINT loyal_type_id_fk;
       public          postgres    false    214    3249    216            �           2606    17195    transaction loyal_type_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT loyal_type_id_fk FOREIGN KEY (loyal_type_id) REFERENCES public.loyal_type(id);
 F   ALTER TABLE ONLY public.transaction DROP CONSTRAINT loyal_type_id_fk;
       public          postgres    false    224    216    3249            �           2606    17200    shop owner_id_fk    FK CONSTRAINT     {   ALTER TABLE ONLY public.shop
    ADD CONSTRAINT owner_id_fk FOREIGN KEY (owner_id) REFERENCES public.account_business(id);
 :   ALTER TABLE ONLY public.shop DROP CONSTRAINT owner_id_fk;
       public          postgres    false    209    218    3235            �           2606    17205    shop status_id_fk    FK CONSTRAINT     x   ALTER TABLE ONLY public.shop
    ADD CONSTRAINT status_id_fk FOREIGN KEY (status_id) REFERENCES public.shop_status(id);
 ;   ALTER TABLE ONLY public.shop DROP CONSTRAINT status_id_fk;
       public          postgres    false    218    3255    222            �           2606    17210    shop type_id_fk    FK CONSTRAINT     r   ALTER TABLE ONLY public.shop
    ADD CONSTRAINT type_id_fk FOREIGN KEY (type_id) REFERENCES public.shop_type(id);
 9   ALTER TABLE ONLY public.shop DROP CONSTRAINT type_id_fk;
       public          postgres    false    212    218    3245            �           2606    17215    shop_client user_id_fk    FK CONSTRAINT     |   ALTER TABLE ONLY public.shop_client
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public.account_user(id);
 @   ALTER TABLE ONLY public.shop_client DROP CONSTRAINT user_id_fk;
       public          postgres    false    220    3241    211            �           2606    17220    transaction user_id_fk    FK CONSTRAINT     |   ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public.account_user(id);
 @   ALTER TABLE ONLY public.transaction DROP CONSTRAINT user_id_fk;
       public          postgres    false    3241    224    211            M   �   x�E�1�0 й����д��P�ĉ�Q�hB�B��Hh��&&��z$�|듂�����y��y�@)O)�R]�%�ڱ�hs%h�3�H�y���&���n+��,��f"mrϧ>Z�:^���1/�zh� �2pm�!�PH��s1�����L���G�����Q˲�*0�      O   w   x�E�1
�0Eg�ك͗lɲ�� =A�����PH����ox�c 줇Js��@J�D��Ż"UC�2"�k�.��y3�_�F�����]���$��듦�~��tz��u�i>�9�>i3G      R   ?   x�]ɱ�@��0w����A������M�6a�0A���<؃����R�����Y��֟p��      T   b   x�3�0�¾{/6_l��������FF&�F��
��V�V�zf�&f����e��8/L��h�.��MPc��RS2Kt��R(2>F��� CP7=      V   G  x����J�0���S�l���I���ʐ6�gڡԵ��C�����
���������|?��	� �	�ж]�����kJ�/`�a�X}ކ���$�e;`V;��b1�۲:�u��N8z���/�
7,�jL����}���r�zێڽ��f̀�oF��ʚj�7�  l^(��D3�����9�\�'*׉��l�S�0E�ńeTd\L)���~(�I�a��@N���5Ļ��(�̑�4A<����H2^P���݇�PR&R
>��������?��I�����sX��n��տ��k�B�}�	U/�QTt<���3$@      X      x������ � �      Z   n   x�3估�/����^l�4202�50�52R0��26�24г4�001�60& [�e�ya�ņ[/��@�OHlU �QϚ4.c�/컰�b���鴰"F��� ��b�      P   �   x���1�@�z���3�bܳx@;-��1E������-��L3��H�F
)1H�
��"t��d�F��46E�ެ�3�sīla���f��J����OQn��`N�s�E�~�*�C����]\e3���Q8H�:����Fd�%�r�.3K��~^�:�Z� �9�:      \      x������ � �     