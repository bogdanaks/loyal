PGDMP                          |            loyal    15.3    15.2 Q    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    82103    loyal    DATABASE     �   CREATE DATABASE loyal WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';
    DROP DATABASE loyal;
                postgres    false                        2615    90525    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            �           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5            �           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            �            1259    90526    account_business    TABLE     \  CREATE TABLE public.account_business (
    id bigint NOT NULL,
    name character varying(100),
    phone character varying(11),
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
 $   DROP TABLE public.account_business;
       public         heap    postgres    false    5            �            1259    90531    account_business_id_seq    SEQUENCE     �   CREATE SEQUENCE public.account_business_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.account_business_id_seq;
       public          postgres    false    214    5            �           0    0    account_business_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.account_business_id_seq OWNED BY public.account_business.id;
          public          postgres    false    215            �            1259    90532    account_user    TABLE     �  CREATE TABLE public.account_user (
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
       public         heap    postgres    false    5            �            1259    90539 	   shop_type    TABLE     �   CREATE TABLE public.shop_type (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.shop_type;
       public         heap    postgres    false    5            �            1259    90544    business_type_id_seq    SEQUENCE     }   CREATE SEQUENCE public.business_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.business_type_id_seq;
       public          postgres    false    5    217            �           0    0    business_type_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.business_type_id_seq OWNED BY public.shop_type.id;
          public          postgres    false    218            �            1259    90545    loyal_program    TABLE     '  CREATE TABLE public.loyal_program (
    id bigint NOT NULL,
    loyal_type_id bigint NOT NULL,
    percent_bonus smallint NOT NULL,
    reg_bonus smallint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
 !   DROP TABLE public.loyal_program;
       public         heap    postgres    false    5            �            1259    90550    loyal_program_id_seq    SEQUENCE     }   CREATE SEQUENCE public.loyal_program_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.loyal_program_id_seq;
       public          postgres    false    5    219            �           0    0    loyal_program_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.loyal_program_id_seq OWNED BY public.loyal_program.id;
          public          postgres    false    220            �            1259    90551 
   loyal_type    TABLE     5  CREATE TABLE public.loyal_type (
    id bigint NOT NULL,
    title character varying(100) NOT NULL,
    icon character varying(100) DEFAULT 'default'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.loyal_type;
       public         heap    postgres    false    5            �            1259    90557    loyal_type_id_seq    SEQUENCE     z   CREATE SEQUENCE public.loyal_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.loyal_type_id_seq;
       public          postgres    false    221    5            �           0    0    loyal_type_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.loyal_type_id_seq OWNED BY public.loyal_type.id;
          public          postgres    false    222            �            1259    90558    shop    TABLE       CREATE TABLE public.shop (
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
       public         heap    postgres    false    5            �            1259    90565    shop_2_id_seq    SEQUENCE     v   CREATE SEQUENCE public.shop_2_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.shop_2_id_seq;
       public          postgres    false    5    223            �           0    0    shop_2_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.shop_2_id_seq OWNED BY public.shop.id;
          public          postgres    false    224            �            1259    90566    shop_client    TABLE     -  CREATE TABLE public.shop_client (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    balance bigint DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.shop_client;
       public         heap    postgres    false    5            �            1259    90573    shop_client_id_seq    SEQUENCE     {   CREATE SEQUENCE public.shop_client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.shop_client_id_seq;
       public          postgres    false    5    225            �           0    0    shop_client_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.shop_client_id_seq OWNED BY public.shop_client.id;
          public          postgres    false    226            �            1259    90574    shop_status    TABLE       CREATE TABLE public.shop_status (
    id bigint NOT NULL,
    title character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    is_default boolean NOT NULL
);
    DROP TABLE public.shop_status;
       public         heap    postgres    false    5            �            1259    90579    shop_status_id_seq    SEQUENCE     {   CREATE SEQUENCE public.shop_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.shop_status_id_seq;
       public          postgres    false    5    227            �           0    0    shop_status_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.shop_status_id_seq OWNED BY public.shop_status.id;
          public          postgres    false    228            �            1259    90580    transaction    TABLE     ~  CREATE TABLE public.transaction (
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
       public         heap    postgres    false    5            �            1259    90585    transaction_id_seq    SEQUENCE     {   CREATE SEQUENCE public.transaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.transaction_id_seq;
       public          postgres    false    229    5            �           0    0    transaction_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.transaction_id_seq OWNED BY public.transaction.id;
          public          postgres    false    230            �            1259    90586    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    5    216            �           0    0    user_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.user_id_seq OWNED BY public.account_user.id;
          public          postgres    false    231            �           2604    90587    account_business id    DEFAULT     z   ALTER TABLE ONLY public.account_business ALTER COLUMN id SET DEFAULT nextval('public.account_business_id_seq'::regclass);
 B   ALTER TABLE public.account_business ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214            �           2604    90588    account_user id    DEFAULT     j   ALTER TABLE ONLY public.account_user ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 >   ALTER TABLE public.account_user ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    216            �           2604    90589    loyal_program id    DEFAULT     t   ALTER TABLE ONLY public.loyal_program ALTER COLUMN id SET DEFAULT nextval('public.loyal_program_id_seq'::regclass);
 ?   ALTER TABLE public.loyal_program ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219            �           2604    90590    loyal_type id    DEFAULT     n   ALTER TABLE ONLY public.loyal_type ALTER COLUMN id SET DEFAULT nextval('public.loyal_type_id_seq'::regclass);
 <   ALTER TABLE public.loyal_type ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221            �           2604    90591    shop id    DEFAULT     d   ALTER TABLE ONLY public.shop ALTER COLUMN id SET DEFAULT nextval('public.shop_2_id_seq'::regclass);
 6   ALTER TABLE public.shop ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223            �           2604    90592    shop_client id    DEFAULT     p   ALTER TABLE ONLY public.shop_client ALTER COLUMN id SET DEFAULT nextval('public.shop_client_id_seq'::regclass);
 =   ALTER TABLE public.shop_client ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225            �           2604    90593    shop_status id    DEFAULT     p   ALTER TABLE ONLY public.shop_status ALTER COLUMN id SET DEFAULT nextval('public.shop_status_id_seq'::regclass);
 =   ALTER TABLE public.shop_status ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227            �           2604    90594    shop_type id    DEFAULT     p   ALTER TABLE ONLY public.shop_type ALTER COLUMN id SET DEFAULT nextval('public.business_type_id_seq'::regclass);
 ;   ALTER TABLE public.shop_type ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            �           2604    90595    transaction id    DEFAULT     p   ALTER TABLE ONLY public.transaction ALTER COLUMN id SET DEFAULT nextval('public.transaction_id_seq'::regclass);
 =   ALTER TABLE public.transaction ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229            y          0    90526    account_business 
   TABLE DATA           d   COPY public.account_business (id, name, phone, email, password, created_at, updated_at) FROM stdin;
    public          postgres    false    214   �a       {          0    90532    account_user 
   TABLE DATA           �   COPY public.account_user (id, tg_user_id, created_at, updated_at, birthday, phone, photo, first_name, last_name, tg_username, email) FROM stdin;
    public          postgres    false    216   �b       ~          0    90545    loyal_program 
   TABLE DATA           l   COPY public.loyal_program (id, loyal_type_id, percent_bonus, reg_bonus, created_at, updated_at) FROM stdin;
    public          postgres    false    219   c       �          0    90551 
   loyal_type 
   TABLE DATA           M   COPY public.loyal_type (id, title, icon, created_at, updated_at) FROM stdin;
    public          postgres    false    221   dc       �          0    90558    shop 
   TABLE DATA           �   COPY public.shop (id, owner_id, type_id, status_id, title, working_hours, short_description, description, photo, created_at, updated_at, banners, phone, address, loyal_program_id) FROM stdin;
    public          postgres    false    223   �c       �          0    90566    shop_client 
   TABLE DATA           ^   COPY public.shop_client (id, user_id, balance, is_active, created_at, updated_at) FROM stdin;
    public          postgres    false    225   ,e       �          0    90574    shop_status 
   TABLE DATA           T   COPY public.shop_status (id, title, created_at, updated_at, is_default) FROM stdin;
    public          postgres    false    227   �e       |          0    90539 	   shop_type 
   TABLE DATA           F   COPY public.shop_type (id, title, created_at, updated_at) FROM stdin;
    public          postgres    false    217   �e       �          0    90580    transaction 
   TABLE DATA           �   COPY public.transaction (id, shop_id, user_id, loyal_type_id, is_accrual, check_amount, bonus_amount, created_at, updated_at) FROM stdin;
    public          postgres    false    229   �f       �           0    0    account_business_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.account_business_id_seq', 54, true);
          public          postgres    false    215            �           0    0    business_type_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.business_type_id_seq', 10, true);
          public          postgres    false    218            �           0    0    loyal_program_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.loyal_program_id_seq', 9, true);
          public          postgres    false    220            �           0    0    loyal_type_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.loyal_type_id_seq', 3, true);
          public          postgres    false    222            �           0    0    shop_2_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.shop_2_id_seq', 1, true);
          public          postgres    false    224            �           0    0    shop_client_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.shop_client_id_seq', 31, true);
          public          postgres    false    226            �           0    0    shop_status_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.shop_status_id_seq', 3, true);
          public          postgres    false    228            �           0    0    transaction_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.transaction_id_seq', 67, true);
          public          postgres    false    230            �           0    0    user_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.user_id_seq', 100027, true);
          public          postgres    false    231            �           2606    90597 +   account_user PK_cace4a159ff9f2512dd42373760 
   CONSTRAINT     k   ALTER TABLE ONLY public.account_user
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);
 W   ALTER TABLE ONLY public.account_user DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
       public            postgres    false    216            �           2606    90599 &   account_business account_business_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.account_business
    ADD CONSTRAINT account_business_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.account_business DROP CONSTRAINT account_business_pkey;
       public            postgres    false    214            �           2606    90601    shop_type business_type_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.shop_type
    ADD CONSTRAINT business_type_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.shop_type DROP CONSTRAINT business_type_pkey;
       public            postgres    false    217            �           2606    90603    account_business email_uniq 
   CONSTRAINT     g   ALTER TABLE ONLY public.account_business
    ADD CONSTRAINT email_uniq UNIQUE (email) INCLUDE (email);
 E   ALTER TABLE ONLY public.account_business DROP CONSTRAINT email_uniq;
       public            postgres    false    214            �           2606    90605     loyal_program loyal_program_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.loyal_program
    ADD CONSTRAINT loyal_program_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.loyal_program DROP CONSTRAINT loyal_program_pkey;
       public            postgres    false    219            �           2606    90607    loyal_type loyal_type_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.loyal_type
    ADD CONSTRAINT loyal_type_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.loyal_type DROP CONSTRAINT loyal_type_pkey;
       public            postgres    false    221            �           2606    90609    account_business phone_uniq 
   CONSTRAINT     g   ALTER TABLE ONLY public.account_business
    ADD CONSTRAINT phone_uniq UNIQUE (phone) INCLUDE (phone);
 E   ALTER TABLE ONLY public.account_business DROP CONSTRAINT phone_uniq;
       public            postgres    false    214            �           2606    90611    shop shop_2_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.shop
    ADD CONSTRAINT shop_2_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.shop DROP CONSTRAINT shop_2_pkey;
       public            postgres    false    223            �           2606    90613    shop_client shop_client_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.shop_client
    ADD CONSTRAINT shop_client_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.shop_client DROP CONSTRAINT shop_client_pkey;
       public            postgres    false    225            �           2606    90615    shop_status shop_status_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.shop_status
    ADD CONSTRAINT shop_status_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.shop_status DROP CONSTRAINT shop_status_pkey;
       public            postgres    false    227            �           2606    90617    account_user tg_user_id 
   CONSTRAINT     m   ALTER TABLE ONLY public.account_user
    ADD CONSTRAINT tg_user_id UNIQUE (tg_user_id) INCLUDE (tg_user_id);
 A   ALTER TABLE ONLY public.account_user DROP CONSTRAINT tg_user_id;
       public            postgres    false    216            �           2606    90619    transaction transaction_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.transaction DROP CONSTRAINT transaction_pkey;
       public            postgres    false    229            �           2606    90620    shop loyal_program_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.shop
    ADD CONSTRAINT loyal_program_id_fk FOREIGN KEY (loyal_program_id) REFERENCES public.loyal_program(id) NOT VALID;
 B   ALTER TABLE ONLY public.shop DROP CONSTRAINT loyal_program_id_fk;
       public          postgres    false    223    3544    219            �           2606    90625    loyal_program loyal_type_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.loyal_program
    ADD CONSTRAINT loyal_type_id_fk FOREIGN KEY (loyal_type_id) REFERENCES public.loyal_type(id) NOT VALID;
 H   ALTER TABLE ONLY public.loyal_program DROP CONSTRAINT loyal_type_id_fk;
       public          postgres    false    219    3546    221            �           2606    90630    transaction loyal_type_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT loyal_type_id_fk FOREIGN KEY (loyal_type_id) REFERENCES public.loyal_type(id);
 F   ALTER TABLE ONLY public.transaction DROP CONSTRAINT loyal_type_id_fk;
       public          postgres    false    3546    229    221            �           2606    90635    shop owner_id_fk    FK CONSTRAINT     {   ALTER TABLE ONLY public.shop
    ADD CONSTRAINT owner_id_fk FOREIGN KEY (owner_id) REFERENCES public.account_business(id);
 :   ALTER TABLE ONLY public.shop DROP CONSTRAINT owner_id_fk;
       public          postgres    false    3532    223    214            �           2606    90640    shop status_id_fk    FK CONSTRAINT     x   ALTER TABLE ONLY public.shop
    ADD CONSTRAINT status_id_fk FOREIGN KEY (status_id) REFERENCES public.shop_status(id);
 ;   ALTER TABLE ONLY public.shop DROP CONSTRAINT status_id_fk;
       public          postgres    false    227    223    3552            �           2606    90645    shop type_id_fk    FK CONSTRAINT     r   ALTER TABLE ONLY public.shop
    ADD CONSTRAINT type_id_fk FOREIGN KEY (type_id) REFERENCES public.shop_type(id);
 9   ALTER TABLE ONLY public.shop DROP CONSTRAINT type_id_fk;
       public          postgres    false    3542    223    217            �           2606    90650    shop_client user_id_fk    FK CONSTRAINT     |   ALTER TABLE ONLY public.shop_client
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public.account_user(id);
 @   ALTER TABLE ONLY public.shop_client DROP CONSTRAINT user_id_fk;
       public          postgres    false    3538    216    225            �           2606    90655    transaction user_id_fk    FK CONSTRAINT     |   ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public.account_user(id);
 @   ALTER TABLE ONLY public.transaction DROP CONSTRAINT user_id_fk;
       public          postgres    false    229    3538    216            y   �   x�E�1�0 й����д��P�ĉ�Q�hB�B��Hh��&&��z$�|듂�����y��y�@)O)�R]�%�ڱ�hs%h�3�H�y���&���n+��,��f"mrϧ>Z�:^���1/�zh� �2pm�!�PH��s1�����L���G�����Q˲�*0�      {   x   x�=�A
�0EדSt_�L2�Lv� ����Bh�^ߢ <x��x���Pq+	�DHd�]�+R��&#�l��O��z�UhD�0jnV�4k!�N�{�>i���J��kY����A�S�n@W      ~   ?   x�]ɱ�@��0w����A������M�6a�0A���<؃����R�����Y��֟p��      �   b   x�3�0�¾{/6_l��������FF&�F��
��V�V�zf�&f����e��8/L��h�.��MPc��RS2Kt��R(2>F��� CP7=      �   F  x����J�0���S�l��\;I���ʐ6�gڡԵ��C�����
���������|?��	� �	�ж]�����kJ�/`�a�X}ކ���$�e;`V;��b1�۲:�u��N8z���/�
7,�jL����}���r�zێڽ��f̀�oF��ʚj�7�  l^(��D3�����9�\�'*שLV6_�)G�"�b�2*2.�9�� �*vT���$U�*��k�w�S�t*0GF��i�"-4F��:��,�>n��2�R���s��v�����?Nb��3����p�g��-�_����M�z	��;���$��o9$J      �   E   x�Uɱ�0��H����`f��_I�koP�)F�#�k6/��]���yc�6jf1��X�z���g�      �   n   x�3估�/����^l�4202�50�52R0��26�24г4�001�60& [�e�ya�ņ[/��@�OHlU �QϚ4.c�/컰�b���鴰"F��� ��b�      |   �   x���1�@�z���3�bܳx@;-��1E������-��L3��H�F
)1H�
��"t��d�F��46E�ެ�3�sīla���f��J����OQn��`N�s�E�~�*�C����]\e3���Q8H�:����Fd�%�r�.3K��~^�:�Z� �9�:      �   
  x���Kj�0@��)�/c����t�����Ld��|<��-�&���W��",�C���|��[t���Q��`Zh��%/&����([7
f�֯_�kR�K-��ަb<�p^)X셮�%eOeҹ��I�Z`S���^)��Ҫ�>���p�|��xG9�EC�aV(��n(ɦ��/v-�(8��3�	N�F��KϳT�H���PA.����I�C��1�<-�W
nw�m�z�6%
����L�F<Ķ�d������IѼ�c1��G�oi��     