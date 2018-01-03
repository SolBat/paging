/**
 * @author solbat.org
 * @description paging process with async data for jquery
 * @date  2017.11.24
 * */
(function ($) {
  'use strict';

  /**
  * @name pageSize : Number of data per page
  * @name totalCnt : Total Data Count
  * @name pageCnt : Total Page Count
  * */
  var _defaults = {
    // pageSetup
    pageSize : 5,
    totalCnt : null,
    pageCnt : null,
    page : 1,

    // UI
    startTag : '<div class="ct_paging">',
    endTag : '</div>',

  };


  $.fn.paging = function (options) {
      var $this = $(this);
      var _PAGE = {};
      var startPage = 0;
      var endPage = 0;

      /**
      * @function init
      * */
      var init = function () {
          _PAGE.settings = $.extend({}, _defaults, options);
          pageCalculator(_PAGE.settings.page, _PAGE.settings.pageSize, _PAGE.settings.totalCnt);
      }

      /**
       * @function pageCalculator
       * */
      var pageCalculator = function (page, pageSize, totalCnt) {
        _PAGE.settings.pageCnt = Math.ceil(totalCnt / _PAGE.settings.pageSize)
        var temp = Math.floor(page /  pageSize);
        startPage = (temp * pageSize) + 1;
        endPage = (temp + 1) * pageSize;

        if (endPage > _PAGE.settings.pageCnt) {
          endPage = _PAGE.settings.pageCnt
        }

        if ( (page % pageSize) === 0 ) {
          startPage = startPage - pageSize;
          endPage = startPage + pageSize - 1;
        }
      }

      /**
       * @function make paging
       * */
      var makePageList = function () {
        var html = _PAGE.settings.startTag;
        var i;

        if (_PAGE.settings.page > 1) {
          html += ' <span class="ct_firstPrev" data-idx="'+1+'"><a>FirstPage</a></span> ';
        } else {
          html += ' <span class="ct_firstPrev"><a>FirstPage</a></span> ';
        }

        if (startPage > 1) {
          html += ' <span class="ct_prev" data-idx="'+(startPage - 1)+'"><a>PrevPage</a></span> ';
        } else {
          html += ' <span class="ct_prev"><a>PrevPage</a></span> ';
        }

        for ( i = startPage; i <= endPage; i++ ) {
            if (_PAGE.settings.page === i) {
              html += ' <span class="ct_numpage ct_nowpage" data-idx="'+i+'">'+i+'</span> ';
            } else {
              html += ' <span class="ct_numpage" data-idx="'+i+'">'+i+'</span> ';
            }
        }

        if (endPage < _PAGE.settings.pageCnt) {
          html += ' <span class="ct_next" data-idx="'+(startPage + _PAGE.settings.pageSize)+'"><a>NextPage</a></span> ';
        } else {
          html += ' <span class="ct_next" ><a>NextPage</a></span> ';
        }

        if (_PAGE.settings.page < _PAGE.settings.pageCnt) {
          html += ' <span class="ct_lastNext" data-idx="'+_PAGE.settings.pageCnt+'"><a>LastPage</a></span> ';
        } else {
          html += ' <span class="ct_lastNext"><a>LastPage</a></span> ';
        }

        html += _PAGE.settings.endTag;

        return html;
      }

    init();
    return $this.html(makePageList());
  };
})(jQuery);




