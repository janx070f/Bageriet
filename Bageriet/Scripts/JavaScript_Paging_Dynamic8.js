// ---------------------------------------------------------------------------------------
// Start på Paging
// ---------------------------------------------------------------------------------------

var Default_Number_Of_Paging_Elements_On_Side = 3;
var DefaultNumberOfPagerPagesInPagerSlider = 5;
var Number_Of_Elements_In_Slider;
var Min_Number_Of_Paging_Elements_On_side = 1;
var Max_Number_Of_Paging_Elements_On_side = 50;
var Paging_One_Step_Max = 10;
var Paging_Five_Step_Min = 15;
var Default_UsePagerElementOnSideSelector = true;
var PagerStyleTable = false;

const SelectPagerName = "NumberOfPagingElementsOnSide"
const NavigationPagerName = "TestNav";
var PagerIndexCounter = 0;

var Classformation = {
    ClassName: "",
    SelectPagerName : "",
    NavigationPagerName: "",
};

var PagerStartPointEnum =
    {
        FIRST_PAGE: 0,
        LAST_PAGE: 1,
        CURRENT_PAGE: 2
    }

Object.freeze(PagerStartPointEnum);

var PagerStartPageType = PagerStartPointEnum.FIRST_PAGE;
var PagerObjectClassList = [];

// Kald funktionen herunder, hvis default værdien med 3 elementer pr. Paging Side ønskes ændret !!!
function SetupDefaultNumberOfPagingElementsOnSide(NumberOfPagingElementsOnSide) {
    Default_Number_Of_Paging_Elements_On_Side = NumberOfPagingElementsOnSide;
}

function DetermineNumberOfPagingElements(PagingComponentsClass)
{
    if (null == PagingComponentsClass)
    {
        return ($("div[class='Paging_Frame']").length);
    }
    else
    {
        return (PagingComponentsClass.length);
    }
}

function GetNumberOfPagingElementsPerSideForPagerOrDefault(pagingClass)
{
    if (null == pagingClass)
    {
        return (Default_Number_Of_Paging_Elements_On_Side);
    }
    else
    {
        if (null == PagingClass.data('Number_Of_Paging_Elements_On_Side', Number_Of_Paging_Elements_On_Side))
        {
            return (-1);
        }
        else
        {
            return (PagingClass.data('Number_Of_Paging_Elements_On_Side', Number_Of_Paging_Elements_On_Side));
        }
    }
}

// -----------------------------------------------------------------------------------------------------------------------

function SearchForAndRemoveObjectsBeforeAndAfterClass(PagerClassName)
{
    var ObjectIndex = ObjectFoundInObjectList(PagerClassName);

    if (-1 != ObjectIndex)
    {
        $("#" + PagerObjectClassList[ObjectIndex].SelectPagerName).remove();
        $("#" + PagerObjectClassList[ObjectIndex].NavigationPagerName).remove();
        PagerObjectClassList.splice(ObjectIndex, 1);
    }
}

function ObjectFoundInObjectList(PagerClassName)
{
    var Counter = 0;
    var ObjectFound = false;

    while ((Counter < PagerObjectClassList.length) && (false == ObjectFound)) {
        if (PagerObjectClassList[Counter].ClassName == PagerClassName) {
            ObjectFound = true;
        }
        else {
            Counter++;
        }
    }

    if (!ObjectFound) {
        return (-1);
    }
    else {
        return (Counter);
    }
}

function InsertReferencesToElemenstBeforeAndAfterClass(PagerClassName)
{
    var ObjectIndex = ObjectFoundInObjectList(PagerClassName);

    if (-1 == ObjectIndex)
    {
        Classformation.ClassName = PagerClassName;
        Classformation.SelectPagerName = SelectPagerName + PagerIndexCounter;
        Classformation.NavigationPagerName = NavigationPagerName + PagerIndexCounter;
        PagerObjectClassList.push(Classformation);
    }
    else
    {
        PagerObjectClassList[ObjectIndex].ClassName = PagerClassName;
        PagerObjectClassList[ObjectIndex].SelectPagerName = SelectPagerName + PagerIndexCounter;
        PagerObjectClassList[ObjectIndex].NavigationPagerName = NavigationPagerName + PagerIndexCounter;
    }
    PagerIndexCounter++;
}


$.fn.AddPageComponentsDynamic =
    function (ObjectArgument)
    {
        AddPageComponentsDynamic($(this), ObjectArgument);
    }
    

function AddPageComponentsDynamic(PagingComponentsClassFunc, ObjectArgument) {
    var PagingComponentClass;
    var PagingClass;

    var Number_Of_Paging_Elements_On_Side;
    var MaxNumberOfPagerPagesInPagerSlider;
    var NumberOfOverallPagerPagesInSlider;
    var NumberOfPagesToShowInSlider;

    var UsePagerElementOnSideSelector;
    var Number_Of_Paging_Elements_On_Side_Has_Changed = false;
    var PagingElementBefore = null;
    var PagingElementAfter = null;
    var PagingClassSelect = null;
    var PagingClass = null;

    if (null == ObjectArgument.PagerClassName) {
        window.alert("Husk at specificere navnet på den klasse, som alle Pager elementerne ligger i. Klasse navnet skal " +
            "angives i parameteren : PagerClassName. Det er nøvendigt at angive klasse navnet, for at der kan ryddes " +
            " ordentligt op, hvis funktionen her kaldes med en klasse uden Pager elementer !!!. Pagerer " + 
            "vil ikke blive sat op, før dette problem er løst.");
        return (false);
    }

    if (null == PagingComponentsClassFunc)
    {
        PagingComponentClass = $("div[class='Paging_Frame']");
    }
    else
    {
        PagingComponentClass = PagingComponentsClassFunc;
    }

    Number_Of_Elements_In_Slider = PagingComponentClass.length;

    if (Number_Of_Elements_In_Slider > 0) {

        if (null == ObjectArgument.Number_Of_Paging_Elements_On_Side) {
            Number_Of_Paging_Elements_On_Side = Default_Number_Of_Paging_Elements_On_Side;
        }
        else {
            Number_Of_Paging_Elements_On_Side = ObjectArgument.Number_Of_Paging_Elements_On_Side;
        }

        if (Number_Of_Paging_Elements_On_Side > Number_Of_Elements_In_Slider) {
            Number_Of_Paging_Elements_On_Side = Number_Of_Elements_In_Slider;
        }

        if (null == ObjectArgument.UsePagerElementOnSideSelector) {
            UsePagerElementOnSideSelector = Default_UsePagerElementOnSideSelector;
        }
        else {
            UsePagerElementOnSideSelector = ObjectArgument.UsePagerElementOnSideSelector;
        }

        if (null == ObjectArgument.MaxNumberOfPagerPagesInPagerSlider) {
            MaxNumberOfPagerPagesInPagerSlider = DefaultNumberOfPagerPagesInPagerSlider;
        }
        else {
            MaxNumberOfPagerPagesInPagerSlider = ObjectArgument.MaxNumberOfPagerPagesInPagerSlider;
        }

        if (null == ObjectArgument.PagerStyleTable)
        {
            PagerStyleTable = false;
        }
        else
        {
            PagerStyleTable = ObjectArgument.PagerStyleTable;
        }

        if (null == ObjectArgument.PagerStartPageType) {
            PagerStartPageType = PagerStartPointEnum.FIRST_PAGE;
        }
        else
        {
            PagerStartPageType = ObjectArgument.PagerStartPageType;
        }

        var TableObject = PagingComponentClass.parents().map(function () {
            if ("TABLE" == this.tagName) {
                PagingElementBefore = $(this);
                if (PagerStyleTable)
                {
                    PagingElementBefore.addClass("display");
                    PagingElementBefore.addClass("table");
                    PagingElementBefore.addClass("table-bordered");
                    PagingElementBefore.addClass("table-striped");
                }
                PagingElementAfter = $(this).next();
            }
            return this.tagName;
        }).get().join(", ");

        if (0 == Number_Of_Elements_In_Slider) {
            if ($(this).prev().hasClass("pagingElementsOnSide")) {
                $(this).prev().remove();
            }
        }
        else {
            PagingComponentClass.each(function () {
                if ($(this).next().hasClass("paging_init")) {
                    $(this).next().remove();
                }
                if (null == PagingElementBefore) {
                    if ($(this).prev().hasClass("pagingElementsOnSide")) {
                        if (null != $(this).prev().data('Number_Of_Paging_Elements_On_Side')) {
                            console.log($(this).prev().data('Number_Of_Paging_Elements_On_Side'));
                            Number_Of_Paging_Elements_On_Side = $(this).prev().data('Number_Of_Paging_Elements_On_Side');
                            Number_Of_Paging_Elements_On_Side_Has_Changed = true;
                        }
                        $(this).prev().remove();
                    }
                }
            });

            if (null != PagingElementBefore) {
                if (PagingElementBefore.next().hasClass("paging_init")) {
                    PagingElementBefore.next().remove();
                }

                if (PagingElementBefore.prev().hasClass("pagingElementsOnSide")) {
                    if (null != PagingElementBefore.prev().data('Number_Of_Paging_Elements_On_Side')) {
                        console.log(PagingElementBefore.prev().data('Number_Of_Paging_Elements_On_Side'));
                        Number_Of_Paging_Elements_On_Side = PagingElementBefore.prev().data('Number_Of_Paging_Elements_On_Side');
                        Number_Of_Paging_Elements_On_Side_Has_Changed = true;
                    }
                    PagingElementBefore.prev().remove();
                }
            }
        }

        var NumberOfPages = Number_Of_Elements_In_Slider / Number_Of_Paging_Elements_On_Side;
        if (Number_Of_Elements_In_Slider % Number_Of_Paging_Elements_On_Side != 0) {
            NumberOfPages++;
        }
        NumberOfPages = Math.floor(NumberOfPages);

        if (NumberOfPages > MaxNumberOfPagerPagesInPagerSlider) {
            NumberOfOverallPagerPagesInSlider = NumberOfPages / MaxNumberOfPagerPagesInPagerSlider;
            if (NumberOfPages % MaxNumberOfPagerPagesInPagerSlider != 0) {
                NumberOfOverallPagerPagesInSlider++;
            }
            NumberOfOverallPagerPagesInSlider = Math.floor(NumberOfOverallPagerPagesInSlider);
            NumberOfPagesToShowInSlider = MaxNumberOfPagerPagesInPagerSlider;
        }
        else {
            NumberOfOverallPagerPagesInSlider = 1;
            NumberOfPagesToShowInSlider = NumberOfPages;
        }

        var SelectedValueFound = false;
        var SelectedValue = 0;

        var WorkStringSelect = '<select name="' + SelectPagerName + PagerIndexCounter + '" id="' + SelectPagerName + PagerIndexCounter + '" class="pagingElementsOnSide">';
        var Counter = Min_Number_Of_Paging_Elements_On_side;
        do {
            if (Counter == Number_Of_Paging_Elements_On_Side) {
                WorkStringSelect += '<option value=' + Counter + ' selected="selected" >' + Counter + '</option>';
                SelectedValueFound = true;
                SelectedValue = Counter;
            }
            else {
                if ((!SelectedValueFound) && (Counter == Number_Of_Elements_In_Slider)) {
                    WorkStringSelect += '<option value=' + Counter + ' selected="selected" >' + Counter + '</option>';
                    SelectedValueFound = true;
                    SelectedValue = Counter;
                }
                else {
                    if ((Counter == Paging_One_Step_Max) && (!SelectedValueFound) && (Number_Of_Elements_In_Slider < Paging_Five_Step_Min)) {
                        WorkStringSelect += '<option value=' + Counter + ' selected="selected" >' + Counter + '</option>';
                        SelectedValueFound = true;
                        SelectedValue = Counter;
                    }
                    else {
                        WorkStringSelect += '<option value=' + Counter + '>' + Counter + '</option>';
                    }
                }
            }
            Counter++;
        } while ((Counter <= Paging_One_Step_Max) && (Counter <= Number_Of_Elements_In_Slider));

        if (Counter < Number_Of_Elements_In_Slider) {
            Counter = Paging_Five_Step_Min;

            while (Counter <= Number_Of_Elements_In_Slider) {
                if ((!SelectedValueFound) && (Counter + 5 > Number_Of_Elements_In_Slider)) {
                    WorkStringSelect += '<option value=' + Counter + ' selected="selected" >' + Counter + '</option>';
                    SelectedValueFound = true;
                    SelectedValue = Counter;
                }
                else {
                    WorkStringSelect += '<option value=' + Counter + '>' + Counter + '</option>';
                }
                Counter += 5;
            }
        }

        WorkStringSelect += '</select>';

        if (null == PagingElementBefore) {
            //Hvis ikke Pager klasserne ligger i en tabel, så sæt antal elementer pr. side selektoren ind
            //før den første "Pager Klasse".
            PagingComponentClass.first().before(WorkStringSelect);
            PagingElementBefore = PagingComponentClass;
            PagingClassSelect = PagingComponentClass.first().prev();
        }
        else {
            //Hvis Pager klasserne ligger i en tabel, så sæt antal elementer pr. side selektoren ind
            //før tabellen.
            PagingElementBefore.first().before(WorkStringSelect);
            PagingClassSelect = PagingElementBefore.first().prev();
        }

        PagingClassSelect.data('Paging_Component_Class', PagingComponentClass);
        PagingClassSelect.data('PagerClassName', ObjectArgument.PagerClassName);
        PagingClassSelect.data('MaxNumberOfPagerPagesInPagerSlider', MaxNumberOfPagerPagesInPagerSlider);
        PagingClassSelect.data('PagerStyleTable', PagerStyleTable);
        PagingClassSelect.data('PagerStartPageType', PagerStartPageType);

        if (Number_Of_Paging_Elements_On_Side_Has_Changed) {
            PagingClassSelect.data('Number_Of_Paging_Elements_On_Side', Number_Of_Paging_Elements_On_Side);
        }

        if (false == UsePagerElementOnSideSelector) {
            // Hvis ikke vi ønsker at anvende den i Pageren indbyggede Element pr. side selektor,
            // så skjul den for brugeren.
            $(".pagingElementsOnSide").hide();
        }

        var WorkString = '<nav name="' + NavigationPagerName + PagerIndexCounter + '" id="' + NavigationPagerName + PagerIndexCounter + '" class="paging_init">';
        WorkString += '<div class="paging">';
        WorkString += '<label for="lblThisPager" id="lblThisPager"></label>';
        WorkString += '<ul class="pagination"></ul>';
        WorkString += '</div>';
        WorkString += '</nav>';

        if (null == PagingElementAfter) {
            PagingComponentClass.last().after(WorkString);
            PagingClass = PagingComponentClass.last().next().find(".paging");
            PagingElementAfter = PagingComponentClass.next();
        }
        else {
            $(WorkString).insertBefore(PagingElementBefore.next());
            PagingClass = PagingElementBefore.next().find(".paging");
            PagingElementAfter = PagingElementAfter.prev();
        }

        PagingComponentClass.data('PagingClass', PagingClass); // (LTPE 10-05-2016)

        PagingClass.data('Number_Of_Paging_Elements_On_Side', Number_Of_Paging_Elements_On_Side);
        PagingClass.data('Number_Of_Paging_Elements', Number_Of_Elements_In_Slider);
        PagingClass.data('Max_Number_Of_Paging_Sides_In_slider', MaxNumberOfPagerPagesInPagerSlider);
        PagingClass.data('Number_Of_Overall_Pager_Sides', NumberOfOverallPagerPagesInSlider);
        PagingClass.data('Number_Of_Pager_Pages', NumberOfPages);
        PagingClass.data('Paging_Element_Start_Number', 1);
        PagingClass.data('Paging_Component_Class', PagingComponentClass);
        PagingClass.data('PagerClassName', ObjectArgument.PagerClassName);

        InsertReferencesToElemenstBeforeAndAfterClass(ObjectArgument.PagerClassName);

        switch (PagerStartPageType)
        {
            case PagerStartPointEnum.FIRST_PAGE:
                //PagingClass.data('CurrentPagerPage', 1);
                SetupPaginationClass(PagingClass, 1);
                PagingComponentClass.ShowPageInitial(1);
                break;

            case PagerStartPointEnum.LAST_PAGE:
                //PagingClass.data('CurrentPagerPage', NumberOfPages);
                //PagingClass.data('CurrentPagerElementNumberEnd', Number_Of_Elements_In_Slider);
                ShowLastPagingElements(PagingClass);
                break;

            case PagerStartPointEnum.CURRENT_PAGE:
                //if (PagerStartPointEnum.CURRENT_PAGE == PagingComponentClass.data('PagerStartPageType'))
                //{
                    // Vi skal spole frem til Pager siden, vi var på før, da denne opsætning også
                    // var brugt sidste gang, vi anvendte pager på dette objekt.
                    var CurrentPagerElementNumberStart = PagingComponentClass.data('CurrentPagerElementNumberStart');
                    var CurrentPagerElementNumberEnd = PagingComponentClass.data('CurrentPagerElementNumberEnd');

                    var CurrentPagerElementNumber = Math.floor((CurrentPagerElementNumberStart + CurrentPagerElementNumberEnd) / 2);
                    var CurrentPageNumber;
                    if (0 == CurrentPagerElementNumber % Number_Of_Paging_Elements_On_Side)
                    {
                        CurrentPageNumber = Math.floor(CurrentPagerElementNumber/Number_Of_Paging_Elements_On_Side);
                    }
                    else
                    {
                        CurrentPageNumber = Math.floor((CurrentPagerElementNumber/Number_Of_Paging_Elements_On_Side) + 1);
                    }

                    if (0 == CurrentPageNumber % MaxNumberOfPagerPagesInPagerSlider) {
                        SetupPaginationClass(PagingClass, CurrentPageNumber);
                    }
                    else
                    {
                        SetupPaginationClass(PagingClass,
                            CurrentPageNumber - (CurrentPageNumber % MaxNumberOfPagerPagesInPagerSlider) + 1,
                            CurrentPageNumber);
                    }
                    PagingComponentClass.ShowPageInitial(CurrentPageNumber);
                //}
                //else
                //{
                //    // Hvis ikke vi havde denne opsætning sidst, så start fra Pager side 1.
                //    PagingClass.data('CurrentPagerPage', 1);
                //    PagingClass.data('CurrentPagerElementNumber', 1);
                //    SetupPaginationClass(PagingClass, 1);
                //    PagingComponentClass.ShowPageInitial(1);
                //}
                break;
        }
        PagingComponentClass.data('PagerStartPageType', PagerStartPageType);
    }
    else
    {
        SearchForAndRemoveObjectsBeforeAndAfterClass(ObjectArgument.PagerClassName);
    }
}

function SetupPaginationClass(CurrentPagingClass, PagerPageStartNumber, PagerPageHighlightNumber)
{
    var PaginationClass = CurrentPagingClass.find(".pagination");
    PaginationClass.empty();

    var Number_Of_Paging_Elements_On_Side = CurrentPagingClass.data('Number_Of_Paging_Elements_On_Side');
    var Number_Of_Elements_In_Slider = CurrentPagingClass.data('Number_Of_Paging_Elements');
    var MaxNumberOfPagerPagesInPagerSlider = CurrentPagingClass.data('Max_Number_Of_Paging_Sides_In_slider');
    var NumberOfOverallPagerPagesInSlider = CurrentPagingClass.data('Number_Of_Overall_Pager_Sides');
    var NumberOfPages = CurrentPagingClass.data('Number_Of_Pager_Pages');

    var WorkString = "";

    WorkString += '<li><a href="#" class="PrevNext FirstPageButton">F</a></li>'
    
    WorkString += '<li>';
    WorkString += '<a href="#" aria-label="Previous" id="PreviousPage" class="PrevNext PreviousPageButton">';
    WorkString += '<span aria-hidden="true">&laquo;</span>'
    WorkString += '</a>';
    WorkString += '</li>';
    
    PaginationClass.append(WorkString);

    var PagerPageStopNumber;
    var PagerPageNumberToHighlight;

    if (null == PagerPageHighlightNumber)
    {
        PagerPageNumberToHighlight = PagerPageStartNumber;
    }
    else
    {
        PagerPageNumberToHighlight = PagerPageHighlightNumber;
    }

    if (NumberOfPages - PagerPageStartNumber < MaxNumberOfPagerPagesInPagerSlider)
    {
        PagerPageStopNumber = NumberOfPages + 1;
    }
    else
    {
        PagerPageStopNumber = PagerPageStartNumber + MaxNumberOfPagerPagesInPagerSlider;
    }

    for (var PagerPageSliderCounter = PagerPageStartNumber; PagerPageSliderCounter < PagerPageStopNumber; PagerPageSliderCounter++)
    {
        if (PagerPageNumberToHighlight == PagerPageSliderCounter)
        {
            PaginationClass.append('<li><a href="#" class="UnderLineText Italic_Text">' + PagerPageSliderCounter + '</a></li>');
        }
        else 
        {
            PaginationClass.append('<li><a href="#">' + PagerPageSliderCounter + '</a></li>');
        }
    }

    WorkString = "";
    WorkString += '<li>';
    WorkString += '<a href="#" aria-label="Next" id="NextPage" class="PrevNext NextPageButton">';
    WorkString += '<span aria-hidden="true">&raquo;</span>'
    WorkString += '</a>';
    WorkString += '</li>';

    WorkString += '<li><a href="#" class="PrevNext LastPageButton">L</a></li>'
        
    PaginationClass.append(WorkString);
}


$('body').on('change', 'select[name*="NumberOfPagingElementsOnSide"]', function (e) {
    $(this).data('Number_Of_Paging_Elements_On_Side', $(this).val());
    AddPageComponentsDynamic($(this).data('Paging_Component_Class'), 
        {
            Number_Of_Paging_Elements_On_Side: $(this).val(),
            PagerClassName: $(this).data('PagerClassName'),
            UsePagerElementOnSideSelector: true,
            MaxNumberOfPagerPagesInPagerSlider: $(this).data('MaxNumberOfPagerPagesInPagerSlider'),
            PagerStyleTable: $(this).data('PagerStyleTable'),
            PagerStartPageType: $(this).data('PagerStartPageType')
        }
    );
});

function ShowPage(PageNumber, PagingObject) {
    var Number_Of_Paging_Elements_On_Side = PagingObject.data('Number_Of_Paging_Elements_On_Side');
    var Number_Of_Paging_Elements = PagingObject.data('Number_Of_Paging_Elements');
    var PagingFrameObject = PagingObject.data('Paging_Component_Class');
    var StartPagerObjectNumber = (PageNumber - 1) * Number_Of_Paging_Elements_On_Side + 1;
    var EndPagerObjectNumber = PageNumber * Number_Of_Paging_Elements_On_Side;

    if (EndPagerObjectNumber > Number_Of_Paging_Elements)
        EndPagerObjectNumber = Number_Of_Paging_Elements;

    PagingFrameObject.hide();
    PagingFrameObject.each(function(n) {
        if (n >= Number_Of_Paging_Elements_On_Side * (PageNumber - 1) && n < Number_Of_Paging_Elements_On_Side * PageNumber) {
            $(this).show();
        }
    });

    PagingObject.data('Paging_Component_Class').data('CurrentPagerElementNumberStart', (PageNumber - 1) * 
        PagingObject.data('Number_Of_Paging_Elements_On_Side') - 1);

    PagingObject.data('Paging_Component_Class').data('CurrentPagerElementNumberEnd', (PageNumber - 1) * 
        PagingObject.data('Number_Of_Paging_Elements_On_Side') - 1 + (PagingObject.data('Number_Of_Paging_Elements_On_Side')));

    //PagingObject.data('CurrentPagerElementNumberStart', PageNumber * 
    //    PagingObject.data('Number_Of_Paging_Elements_On_Side'));

    //PagingObject.data('CurrentPagerElementNumberEnd', PageNumber *
    //    PagingObject.data('Number_Of_Paging_Elements_On_Side') + (PagingObject.data('Number_Of_Paging_Elements_On_Side') - 1));

    PagingObject.find("#lblThisPager").text("Showing " + StartPagerObjectNumber + " - " +
                                             EndPagerObjectNumber + " of " + Number_Of_Paging_Elements + " entries");
}

$.fn.ShowPageInitial =
    function (PageNumber) {
        var PagingObject = $(this).data('PagingClass');
        var Number_Of_Paging_Elements_On_Side = PagingObject.data('Number_Of_Paging_Elements_On_Side');
        var Number_Of_Paging_Elements = PagingObject.data('Number_Of_Paging_Elements');
        var StartPagerObjectNumber = (PageNumber - 1) * Number_Of_Paging_Elements_On_Side + 1;
        var EndPagerObjectNumber = PageNumber * Number_Of_Paging_Elements_On_Side;
        

        if (EndPagerObjectNumber > Number_Of_Paging_Elements) {
            EndPagerObjectNumber = Number_Of_Paging_Elements;
        }

        $(this).hide();
        $(this).each(function (n) {
            if (n >= Number_Of_Paging_Elements_On_Side * (PageNumber - 1) && n < Number_Of_Paging_Elements_On_Side * PageNumber) {
                $(this).show();
            }
        });

        PagingObject.data('Paging_Component_Class').data('CurrentPagerElementNumberStart', (PageNumber - 1) *
        PagingObject.data('Number_Of_Paging_Elements_On_Side') - 1);

        PagingObject.data('Paging_Component_Class').data('CurrentPagerElementNumberEnd', (PageNumber - 1) *
            PagingObject.data('Number_Of_Paging_Elements_On_Side') - 1 + (PagingObject.data('Number_Of_Paging_Elements_On_Side')));

        //PagingObject.data('CurrentPagerElementNumberStart', PageNumber *
        //    PagingObject.data('Number_Of_Paging_Elements_On_Side'));

        //PagingObject.data('CurrentPagerElementNumberEnd', PageNumber *
        //    PagingObject.data('Number_Of_Paging_Elements_On_Side') + (PagingObject.data('Number_Of_Paging_Elements_On_Side') - 1));

        PagingObject.find("#lblThisPager").text("Showing " + StartPagerObjectNumber + " - " +
                                                 EndPagerObjectNumber + " of " + Number_Of_Paging_Elements + " entries");
    }

$('body').on('click', ".paging li a:not('.PrevNext')", function (e) {
    e.preventDefault();

    var PagingObject = $(this).closest(".paging");
    $("li a", PagingObject).removeClass("UnderLineText Italic_Text");

    $(this).addClass("UnderLineText Italic_Text");
    ShowPage(parseInt($(this).text()), PagingObject);
});

$("body").on('click', ".paging li a.LastPageButton", function (e) {
    e.preventDefault();

    var PagingObject = $(this).closest(".paging");
    ShowLastPagingElements(PagingObject);

    //var LastPageNumber = PagingObject.data('Number_Of_Pager_Pages');
    //var CurrentPageNumber = LastPageNumber;
  
    //var MaxNumberOfPagerPagesInPagerSlider = PagingObject.data('Max_Number_Of_Paging_Sides_In_slider');
    //var StartPageNumber;

    //if (0 == LastPageNumber % MaxNumberOfPagerPagesInPagerSlider)
    //{
    //    StartPageNumber = LastPageNumber - MaxNumberOfPagerPagesInPagerSlider;
    //}
    //else
    //{
    //    StartPageNumber = Math.floor(LastPageNumber / MaxNumberOfPagerPagesInPagerSlider) * MaxNumberOfPagerPagesInPagerSlider + 1;
    //}
    //SetupPaginationClass(PagingObject, StartPageNumber, LastPageNumber);
    //ShowPage(CurrentPageNumber, PagingObject);
});

function ShowLastPagingElements(PagingObject)
{
    var LastPageNumber = PagingObject.data('Number_Of_Pager_Pages');
    var CurrentPageNumber = LastPageNumber;

    var MaxNumberOfPagerPagesInPagerSlider = PagingObject.data('Max_Number_Of_Paging_Sides_In_slider');
    var StartPageNumber;

    if (0 == LastPageNumber % MaxNumberOfPagerPagesInPagerSlider) {
        StartPageNumber = (LastPageNumber - MaxNumberOfPagerPagesInPagerSlider) + 1;
    }
    else {
        StartPageNumber = Math.floor(LastPageNumber / MaxNumberOfPagerPagesInPagerSlider) * MaxNumberOfPagerPagesInPagerSlider + 1;
    }

    //PagingObject.data('CurrentPagerElementNumberStart', Number_Of_Elements_In_Slider -
    //    PagingObject.data('Number_Of_Paging_Elements_On_Side'));
    //PagingClass.data('CurrentPagerElementNumberEnd', Number_Of_Elements_In_Slider);

    SetupPaginationClass(PagingObject, StartPageNumber, LastPageNumber);
    ShowPage(CurrentPageNumber, PagingObject);
}


$("body").on('click', ".paging li a.NextPageButton", function (e) {
    e.preventDefault();

    var PagingObject = $(this).closest(".paging");
    var LastPageNumber = PagingObject.data('Number_Of_Pager_Pages');
    var CurrentPageNumber = $("li a.UnderLineText", PagingObject).text();
    
    var MaxNumberOfPagerPagesInPagerSlider = PagingObject.data('Max_Number_Of_Paging_Sides_In_slider');
    var FirstPagerNumber = $("li a:not('.PrevNext')", PagingObject).first().text();

    if (CurrentPageNumber < LastPageNumber) {
        if (0 == CurrentPageNumber % MaxNumberOfPagerPagesInPagerSlider)
        {
            CurrentPageNumber++;
            SetupPaginationClass(PagingObject, CurrentPageNumber);
        }
        else
        {
            CurrentPageNumber++;
            $("li a", PagingObject).removeClass("UnderLineText Italic_Text");
            $("li a:not('.PrevNext')", PagingObject).eq(CurrentPageNumber - FirstPagerNumber).addClass("UnderLineText Italic_Text");
        }
  
        ShowPage(CurrentPageNumber, PagingObject);
    }
});

$("body").on('click', ".paging li a.PreviousPageButton", function (e) {
    e.preventDefault();

    var PagingObject = $(this).closest(".paging");
    var FirstPageNumber = $("li a:not('.PrevNext')", PagingObject).first().text();
    var CurrentPageNumber = $("li a.UnderLineText", PagingObject).text();
    var MaxNumberOfPagerPagesInPagerSlider = PagingObject.data('Max_Number_Of_Paging_Sides_In_slider');

    if (CurrentPageNumber > 1) {
        if (0 == (CurrentPageNumber - 1) % MaxNumberOfPagerPagesInPagerSlider)
        {
            CurrentPageNumber--;
            SetupPaginationClass(PagingObject, CurrentPageNumber - MaxNumberOfPagerPagesInPagerSlider + 1, CurrentPageNumber);
        }
        else
        {
            CurrentPageNumber--;
            $("li a", PagingObject).removeClass("UnderLineText Italic_Text");
            $("li a:not('.PrevNext')", PagingObject).eq(CurrentPageNumber - FirstPageNumber).addClass("UnderLineText Italic_Text");
        }
        
        ShowPage(CurrentPageNumber, PagingObject);
    }
});

$("body").on('click', ".paging li a.FirstPageButton", function (e) {
    e.preventDefault();

    var PagingObject = $(this).closest(".paging");
    CurrentPageNumber = 1;
    $("li a", PagingObject).removeClass("UnderLineText Italic_Text");
    $("li a:not('.PrevNext')", PagingObject).eq(CurrentPageNumber - 1).addClass("UnderLineText Italic_Text");

    SetupPaginationClass(PagingObject, 1);
    ShowPage(CurrentPageNumber, PagingObject);
});
// ---------------------------------------------------------------------------------------
// Slut på Paging
// ---------------------------------------------------------------------------------------