export interface ThemeSetting {
    pixelId:  string;
    Language: Language[];
    theme:    Theme;
    Menu:     Menu;
    Pages:    Page[];
}

export interface Language {
    id:          number;
    name:        string;
    active:      boolean;
    direction:   string;
    created_at:  Date;
    updated_at:  Date;
    general:     General;
    exception:   Exception;
    auth:        Auth;
    checkout:    Checkout;
    actions:     Actions;
    gateways:    Gateways;
    order:       Order;
    cart:        Cart;
    reviews:     Reviews;
    pages:       Pages;
    category:    LanguageCategory;
    messages:    Messages;
    emails:      Emails;
    image:       Image;
    shipping:    Shipping;
    billing:     Billing;
    error_codes: ErrorCodes;
    print_order: PrintOrder;
}

export interface Actions {
    id:                           number;
    save:                         string;
    send:                         string;
    submit:                       string;
    loading:                      string;
    load_more:                    string;
    search:                       string;
    apply:                        string;
    add_to_cart:                  string;
    buy_now:                      string;
    return_to_cart:               string;
    continue_to_payment_methods:  string;
    continue_to_shipping_methods: string;
    readmore:                     string;
    readless:                     string;
    save_address:                 string;
    edit_address:                 string;
    loading_in_progress:          string;
}

export interface Auth {
    id:                           number;
    password_link_sent:           string;
    account_not_found:            string;
    account_updated:              string;
    account_created:              string;
    edit_account:                 string;
    email:                        string;
    password:                     string;
    confirm_password:             string;
    edit_personal_info:           string;
    first_name:                   string;
    last_name:                    string;
    phone_number:                 string;
    send_password_reset_request:  string;
    reset_password:               string;
    login:                        string;
    remember_me:                  string;
    forgot_password:              string;
    personal_info:                string;
    i_have_an_account:            string;
    my_account:                   string;
    my_orders:                    string;
    logout:                       string;
    dashboard:                    string;
    please_verify_email_address:  string;
    request_new_password:         string;
    reset_your_password:          string;
    customer_invalid_credentials: string;
    new_customer:                 string;
    sign_up:                      string;
    invalid_captcha:              string;
}

export interface Billing {
    id:                          number;
    required_unless_first_name:  string;
    required_unless_last_name:   string;
    required_unless_address:     string;
    required_unless_city:        string;
    required_unless_postal_code: string;
    required_phone_or_email:     string;
}

export interface Cart {
    id:                      number;
    my_cart:                 string;
    items:                   string;
    shop_now:                string;
    product_name:            string;
    quantity:                string;
    quantity_updated:        string;
    price:                   string;
    comments:                string;
    update_notes:            string;
    additional_comments:     string;
    get_estimated_shipping:  string;
    shipping:                string;
    shipping_not_calculated: string;
    coupon:                  string;
    coupon_code:             string;
    total:                   string;
    checkout:                string;
    error_saving_notes:      string;
    coupon_applied:          string;
    coupon_confirm_remove:   string;
    invalid_coupon:          string;
    continue_shopping:       string;
    my_shopping_cart:        string;
}

export interface LanguageCategory {
    id:              number;
    sorted_by:       string;
    alpha_asc:       string;
    alpha_desc:      string;
    created_at_asc:  string;
    created_at_desc: string;
    price_asc:       string;
    price_desc:      string;
}

export interface Checkout {
    id:                          number;
    notes_updated:               string;
    request_canceled:            string;
    cart_is_empty:               string;
    quantity:                    string;
    quantity_updated:            string;
    list_price:                  string;
    shipping:                    string;
    total:                       string;
    no_gateways_enabled:         string;
    customer_information:        string;
    customer:                    string;
    first_name:                  string;
    last_name:                   string;
    full_name:                   string;
    note:                        string;
    phone:                       string;
    address:                     string;
    email:                       string;
    phone_or_email:              string;
    company:                     string;
    company_name:                string;
    password:                    string;
    password_confirmation:       string;
    shipping_address:            string;
    shipping_information:        string;
    billing_address:             string;
    new_address:                 string;
    suite:                       string;
    city:                        string;
    state:                       string;
    same_as_shipping_address:    string;
    zip_code:                    string;
    invalid_server_response:     string;
    authorise_stripe_account:    string;
    payment_information:         string;
    coupon:                      string;
    show_order_summary:          string;
    postal_code:                 string;
    cart_subtotal:               string;
    checkout:                    string;
    product_added:               string;
    description:                 string;
    cart_items_unavailable:      string;
    contact:                     string;
    ship_to:                     string;
    stripe_name_on_card:         string;
    required_name_on_card:       string;
    customer_informations_error: string;
}

export interface Emails {
    id:                                  number;
    disable_emails:                      string;
    order_details_order_ref:             string;
    order_details_order_date:            string;
    order_details_products:              string;
    order_details_price:                 string;
    customer_full_name:                  string;
    customer_first_name:                 string;
    customer_last_name:                  string;
    order_details_qte:                   string;
    order_details_total:                 string;
    order_details_subtotal:              string;
    order_details_vat:                   string;
    order_details_discount:              string;
    order_details_coupon:                string;
    customer_welcome_content:            string;
    customer_welcome_button:             string;
    closed_order_content:                string;
    closed_order_button:                 string;
    new_order_content:                   string;
    new_order_button:                    string;
    refund_order_content_partially:      string;
    refund_order_content_fully:          string;
    refund_order_amount:                 string;
    refund_order_reason:                 string;
    refund_order_button:                 string;
    request_payment_content:             string;
    request_payment_button:              string;
    reset_password_content:              string;
    reset_password_button:               string;
    order_paid_content:                  string;
    order_paid_button:                   string;
    order_fulfilled_content:             string;
    order_fulfilled_content_no_tracking: string;
    order_fulfilled_button:              string;
    contact_subject:                     string;
    contact_new_message:                 string;
}

export interface ErrorCodes {
    id:            number;
    errorCode_200: string;
    errorCode_300: string;
    errorCode_400: string;
    errorCode_600: string;
    errorCode_601: string;
    errorCode_602: string;
    errorCode_603: string;
    errorCode_604: string;
    errorCode_605: string;
    errorCode_606: string;
    errorCode_607: string;
}

export interface Exception {
    id:                               number;
    code:                             string;
    no_handler_for_gateway:           string;
    invalid_payment_request:          string;
    error_paypal_payment:             string;
    internal_error:                   string;
    card_declined:                    string;
    invalid_request:                  string;
    gateway_auth_error:               string;
    gateway_internal_error:           string;
    invalid_addressable:              string;
    payment_instance:                 string;
    verify_form_fields:               string;
    empty_collection:                 string;
    product_inventory_left:           string;
    product_out_of_stock:             string;
    gateway_error:                    string;
    store_not_published_header:       string;
    store_not_published_description:  string;
    store_not_published_footer:       string;
    store_on_maintenance_header:      string;
    store_on_maintenance_description: string;
    store_on_maintenance_footer:      string;
    store_on_maintenance_password:    string;
    store_on_maintenance_preview:     string;
    domain_not_verified:              string;
    cart_max_total_reached:           string;
    product_not_available:            string;
    rate_limit:                       string;
    cart_max_qte_reached:             string;
    total_zero:                       string;
    choose_variant:                   string;
}

export interface Gateways {
    id:                   number;
    credit_card:          string;
    card_number:          string;
    card_exp_month:       string;
    card_exp_year:        string;
    card_cvc:             string;
    pay:                  string;
    cash_on_delivery:     string;
    additional_notes:     string;
    pay_on_delivery:      string;
    paypal:               string;
    checkout_with_paypal: string;
    custom_payment:       string;
    pay_with_stripe:      string;
}

export interface General {
    id:               number;
    lifetime:         string;
    VAT:              string;
    day:              string;
    hour:             string;
    minute:           string;
    second:           string;
    home:             string;
    paid:             string;
    unpaid:           string;
    captured:         string;
    refunded:         string;
    pending:          string;
    fulfilled:        string;
    unfulfilled:      string;
    canceled:         string;
    full:             string;
    partial:          string;
    language:         string;
    open:             string;
    processed:        string;
    closed:           string;
    canceledBySeller: string;
}

export interface Image {
    id:                 number;
    upload_instruction: string;
}

export interface Messages {
    id:                      number;
    shipping_saved:          string;
    pay_order_error:         string;
    thanks_for_your_order:   string;
    order_already_paid:      string;
    order_already_fulfilled: string;
    order_closed_by_owner:   string;
    address_saved:           string;
}

export interface Order {
    id:                     number;
    orders:                 string;
    order:                  string;
    order_id:               string;
    notes:                  string;
    name:                   string;
    price:                  string;
    quantity:               string;
    discount:               string;
    coupon:                 string;
    shipping:               string;
    status:                 string;
    address:                string;
    total:                  string;
    products:               string;
    my_orders:              string;
    date:                   string;
    payment_status:         string;
    shipping_status:        string;
    view_details:           string;
    payment_information:    string;
    cash_plus:              string;
    custom_payment:         string;
    payment_method:         string;
    cash_on_delivery:       string;
    no_payment_information: string;
    shipping_address:       string;
    product:                string;
    total_price:            string;
    thank_you_for_order:    string;
    review:                 string;
}

export interface Pages {
    id:                  number;
    alpha:               string;
    popularity:          string;
    price:               string;
    newest:              string;
    discount:            string;
    featured_collection: string;
    find_everything:     string;
    promotions:          string;
    save:                string;
    related_products:    string;
    scarcity_message:    string;
    all_collections:     string;
    search:              string;
    results_label:       string;
    view_all_products:   string;
    fake_visitors_msg:   string;
    collections:         string;
    templates:           string;
    email:               string;
    subject:             string;
    message:             string;
    success:             string;
}

export interface PrintOrder {
    id:                    number;
    print:                 string;
    order:                 string;
    invoice:               string;
    invoice_for:           string;
    products:              string;
    product_name:          string;
    product_qty:           string;
    product_price:         string;
    payment_info:          string;
    payment_cart_subtotal: string;
    payment_coupon:        string;
    payment_tax:           string;
    payment_shipping:      string;
    payment_total:         string;
    customer_info:         string;
    customer_fullname:     string;
    customer_phone:        string;
    customer_email:        string;
    customer_shipping:     string;
}

export interface Reviews {
    id:                number;
    browse:            string;
    customers_reviews: string;
    comment_review:    string;
    rating:            string;
    review:            string;
    reviews:           string;
    add:               string;
    save:              string;
    thanks:            string;
    success:           string;
}

export interface Shipping {
    id:                               number;
    required_if_first_name:           string;
    required_if_last_name:            string;
    required_if_address:              string;
    required_if_city:                 string;
    required_if_postal_code:          string;
    no_shipping_defined:              string;
    loading_shipping_in_progress:     string;
    waiting_for_customer_information: string;
}

export interface Menu {
    id:                 number;
    Title:              string;
    headerMenu:         AboutMenu;
    aboutMenu:          AboutMenu;
    termsAndConditions: AboutMenu;
    contactUs:          AboutMenu;
    mainMenu:           AboutMenu;
}

export interface AboutMenu {
    id:        number;
    Title:     string;
    listLinks: ListLink[];
}

export interface ListLink {
    id:           number;
    ExternalLink: ExternalLink;
    name:         string;
    Link:         string;
}

export enum ExternalLink {
    External = "External",
}

export interface Page {
    id:         number;
    name:       string;
    slug:       string;
    template:   string;
    body:       string;
    visibility: boolean;
    created_at: Date;
    updated_at: Date;
    meta:       null;
}

export interface Theme {
    id:                  number;
    Logo:                string;
    favicon:             string;
    MenuFont:            string;
    MenuPreview:         string;
    BodyFont:            string;
    BodyPreview:         string;
    Primary:             string;
    lightPrimary:        string;
    templateType:        "restaurant"|"store"|"joomla";
    darkPrimary:         string;
    Secondary:           string;
    bodyBackgroundColor: BodyBackgroundColor;
    Success:             string;
    info:                string;
    Warning:             string;
    Danger:              string;
    state:               boolean;
    globalBreadcrumbs:   boolean;
    checkoutBreadcrumbs: boolean;
    DoublePrecision:     boolean;
    created_at:          Date;
    updated_at:          Date;
    CheckoutSettings:    CheckoutSettings;
    headerFooterSetting: HeaderFooterSetting;
    generalSetting:      GeneralSetting|null;
    ProductSetting:      ProductSetting;
    HomePage:            HomePage;
}

export interface CheckoutSettings {
    id:              number;
    OnePageCheckout: boolean;
    ShowCoupon:      boolean;
}

export interface HomePage {
    id:               number;
    HomePageSections: HomePageSection[];
}

export interface HomePageSection {
    id:                   number;
    type:                 string;
    index:                number;
    subTitle:             null | string;
    title:                null | string;
    format:               null | string;
    size:                 null | string;
    ImageShadow:          null;
    textSize:             null | string;
    frequency:            number;
    height:               null;
    content:              null | string;
    cart_type:            null;
    limit:                number | null;
    typeCart:             null;
    showLoadMore:         boolean | null;
    titleColor:           null | string;
    subTitleColor:        null | string;
    textColor:            null | string;
    itemPriceColorBefore: null | string;
    itemPriceColorAfter:  null | string;
    itemTitle:            null | string;
    itemBorderColor:      null | string;
    itemBorderColorHover: null | string;
    paddingTop:           number;
    paddingBottom:        number;
    backgroundColor:      string;
    Button:               Button | null;
    Style:                Style | null;
    category:             CategoryElement | null;
    Product:              Product | null;
    categories:           CategoryElement[];
    itemButton:           Button | null;
    itemStyle:            Style | null;
    sliders:              Slider[];
}

export interface Button {
    id:               number;
    title:            string;
    size:             string;
    fontSize:         string;
    color:            string;
    backgroundColor:  BackgroundColor;
    titleHover:       string;
    borderColor:      string;
    borderColorHover: string;
    backgroundHover:  string;
}

export enum BackgroundColor {
    Fbeaea = "#fbeaea",
    The05Be35 = "#05BE35",
    The7E4444 = "#7e4444",
}

export interface Product {
    images:                  string[];
    tags:                    any[];
    id:                      number;
    name:                    string;
    sku:                     null;
    barcode:                 null;
    slugName:                null;
    description:             string;
    currency:                string;
    freeshipping:            boolean;
    state:                   boolean;
    price:                   number;
    CompareAtPrice:          number;
    originalPrice:           number;
    stock:                   number;
    sold_out:                number;
    discount:                number;
    weight:                  string;
    width:                   number;
    height:                  number;
    length:                  number;
    dimensions:              string;
    rating:                  number;
    showTitle:               boolean;
    showInPage:              boolean;
    underStock:              boolean;
    specificPriceDelivery:   boolean;
    deliveryCostToTheOffice: null;
    deliveryCostToTheHome:   null;
    hasOffer:                boolean;
    priceOffer:              null;
    minNumberQteOffer:       null;
    showImages:              boolean;
    showPriceDiscount:       boolean;
    showPriceTotal:          boolean;
    showCountdown:           boolean;
    limitAlert:              number;
    limitAlertOne:           number;
    limitAlertTwo:           number;
    sub_description:         string;
    note:                    null;
    createdAt:               Date;
    updatedAt:               Date;
}

export interface Style {
    id:              number;
    paddingTop:      number | null;
    paddingBottom:   number | null;
    backgroundColor: BackgroundColor;
    color:           BodyBackgroundColor;
    fontSize:        null | string;
    height:          null;
}

export enum BodyBackgroundColor {
    Ffffff = "#FFFFFF",
    The6D3131 = "#6d3131",
    The8E0606 = "#8e0606",
}

export interface CategoryElement {
    id:             number;
    name:           string;
    image:          string;
    state:          boolean;
    parentCategory: null;
    subcategories:  null;
    created_at:     Date;
    updated_at:     Date;
}

export interface Slider {
    id:              number;
    image:           string;
    mobileImage:     string;
    position:        "center"|"left"|"right";
    link:            string;
    index:           number;
    headingText:     string;
    headingColor:    string;
    subheadingText:  string;
    subheadingColor: string;
}

export interface ProductSetting {
    id:                  number;
    title:               boolean;
    images:              boolean;
    price:               boolean;
    visitorsMin:         number;
    visitorsMax:         number;
    stockMin:            number;
    stockMax:            number;
    countdownDay:        number;
    Primary:             string;
    Secondary:           string;
    Selected:            BodyBackgroundColor;
    countdownHours:      number;
    countdownMinutes:    number;
    countdownSeconds:    number;
    titleColor:          string;
    LinkColor:           string;
    PriceColorBefore:    string;
    PriceColorAfter:     string;
    variants:            boolean;
    scarcity:            boolean;
    visitors:            boolean;
    countdown:           boolean;
    description:         boolean;
    expressCheckoutForm: boolean;
    addToCartQuantity:   boolean;
    facebookShare:       boolean;
    twitterShare:        boolean;
    whatsappShare:       boolean;
    Reviews:             boolean;
    TruncateDescription: boolean;
    RelatedProducts:     boolean;
    DirectAddToCart:     boolean;
    Cart:                CartClass;
    QuantityStyle:       Style;
    SectionStyle:        Style;
}

export interface CartClass {
    id:               number;
    text:             string;
    StickyOnMobile:   boolean;
    StickyOnDesktop:  boolean;
    QuantitySelector: boolean;
    SkipCart:         boolean;
}

export interface GeneralSetting {
    id:                     number;
    storeName:              string;
    storeTitle:             string|null;
    storeEmail:             string|null;
    storeDescription:       null;
    storeCurrency:          string;
    storeSymbol:            null;
    contact_phone:          string|null;
    maxCheckoutAmount:      null;
    maxCheckoutQuantity:    null;
    orderPrefix:            null;
    orderSuffix:            null;
    orderVat:               null;
    orderTimeZone:          null;
    customRobotsTxtContent: null;
    facebookUrl:            string|null;
    twitterUrl:             string|null;
    Instagram_url:          string|null;
    TiktokUrl:              string|null;
}

export interface HeaderFooterSetting {
    id:                  number;
    MobileNoticeBar:     string;
    DesktopNoticeBar:    string;
    CustomFooterContent: string;
    HeaderBackground:    BodyBackgroundColor;
    HeaderBorderColor:   string;
    HeaderButtonsColor:  string;
    FooterBorderColor:   string;
    FooterTextColor:     string;
    FooterBackground:    string;
    CustomFooter:        boolean;
    headersBorderColor:  boolean;
    FooterBorder:        boolean;
    ShowLogo:            boolean;
    ShowSearch:          boolean;
    ShowCart:            boolean;
    ShowUser:            boolean;
    ShowMenu:            boolean;
    ShowMenuIcon:        boolean;
}
